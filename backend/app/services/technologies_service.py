import re
import unicodedata
from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models.technology import Technology
from app.schemas.technology import TechnologyCreate, TechnologyUpdate
from app.utils.asset_paths import normalize_public_asset_path

settings = get_settings()

TECHNOLOGY_IMAGE_DIRECTORY = settings.technology_image_dir
TECHNOLOGY_IMAGE_UPLOAD_DIRECTORY = settings.technology_image_upload_dir
TECHNOLOGY_IMAGE_EXTENSIONS = {".svg", ".png", ".jpg", ".jpeg"}


def list_technologies(db: Session) -> list[Technology]:
    stmt = select(Technology).order_by(Technology.order.asc().nulls_last(), Technology.name.asc())
    return db.scalars(stmt).all()


def get_technology_or_404(db: Session, technology_id: int) -> Technology:
    technology = db.get(Technology, technology_id)
    if technology is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Technology not found")
    return technology


def create_technology(db: Session, payload: TechnologyCreate) -> Technology:
    technology_data = payload.model_dump()
    technology_data["img_url"] = normalize_public_asset_path(
        technology_data.get("img_url"),
        default_directory=TECHNOLOGY_IMAGE_DIRECTORY,
    ) or None
    technology = Technology(**technology_data)
    db.add(technology)
    db.commit()
    db.refresh(technology)
    return technology


def update_technology(db: Session, technology_id: int, payload: TechnologyUpdate) -> Technology:
    technology = get_technology_or_404(db, technology_id)

    for field, value in payload.model_dump(exclude_unset=True).items():
        if field == "img_url":
            value = (
                normalize_public_asset_path(
                    value,
                    default_directory=TECHNOLOGY_IMAGE_DIRECTORY,
                )
                or None
            )
        setattr(technology, field, value)

    db.commit()
    db.refresh(technology)
    return technology


def delete_technology(db: Session, technology_id: int) -> None:
    technology = get_technology_or_404(db, technology_id)
    db.delete(technology)
    db.commit()


async def save_technology_image(image: UploadFile | None) -> str | None:
    if image is None:
        return None

    filename = (image.filename or "").strip()
    extension = Path(filename).suffix.lower()

    if extension not in TECHNOLOGY_IMAGE_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Solo se permiten imagenes SVG, PNG, JPG o JPEG.",
        )

    content = await image.read()
    await image.close()

    if not content:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La imagen enviada esta vacia.",
        )

    TECHNOLOGY_IMAGE_UPLOAD_DIRECTORY.mkdir(parents=True, exist_ok=True)

    safe_name = _slugify_filename_part(Path(filename).stem) or "tecnologia"
    generated_filename = f"{safe_name}-{uuid4().hex}{extension}"
    target_path = TECHNOLOGY_IMAGE_UPLOAD_DIRECTORY / generated_filename
    target_path.write_bytes(content)

    return f"{TECHNOLOGY_IMAGE_DIRECTORY}/{generated_filename}"


def _slugify_filename_part(value: str) -> str:
    normalized_value = (
        unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    )
    return re.sub(r"[^a-z0-9]+", "-", normalized_value.lower()).strip("-")
