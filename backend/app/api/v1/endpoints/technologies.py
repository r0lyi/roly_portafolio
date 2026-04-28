from fastapi import APIRouter, File, Form, Response, UploadFile, status

from app.api.dependencies import AdminUser, DBSession
from app.api.forms import normalize_optional_text, normalize_required_text, parse_optional_int
from app.schemas.technology import TechnologyCreate, TechnologyRead, TechnologyUpdate
from app.services import technologies_service

router = APIRouter(prefix="/technologies", tags=["Technologies"])


@router.get("/", response_model=list[TechnologyRead])
def list_technologies(db: DBSession):
    return technologies_service.list_technologies(db)


@router.get("/{technology_id}", response_model=TechnologyRead)
def get_technology(technology_id: int, db: DBSession):
    return technologies_service.get_technology_or_404(db, technology_id)


@router.post("/", response_model=TechnologyRead, status_code=status.HTTP_201_CREATED)
async def create_technology(
    db: DBSession,
    admin_user: AdminUser,
    name: str = Form(...),
    group: str | None = Form(default=None),
    order: str | None = Form(default=None),
    img_url: str | None = Form(default=None),
    image: UploadFile | None = File(default=None),
):
    payload = TechnologyCreate(
        name=normalize_required_text(name, field_name="El nombre de la tecnologia"),
        group=normalize_optional_text(group),
        order=parse_optional_int(order, field_name="El orden"),
        img_url=await _resolve_image_url(img_url=img_url, image=image),
    )
    return technologies_service.create_technology(db, payload)


@router.patch("/{technology_id}", response_model=TechnologyRead)
async def update_technology(
    technology_id: int,
    db: DBSession,
    admin_user: AdminUser,
    name: str | None = Form(default=None),
    group: str | None = Form(default=None),
    order: str | None = Form(default=None),
    img_url: str | None = Form(default=None),
    remove_image: bool = Form(default=False),
    image: UploadFile | None = File(default=None),
):
    payload_data = {}

    if name is not None:
        payload_data["name"] = normalize_required_text(
            name,
            field_name="El nombre de la tecnologia",
        )

    if group is not None:
        payload_data["group"] = normalize_optional_text(group)

    if order is not None:
        payload_data["order"] = parse_optional_int(order, field_name="El orden")

    if remove_image:
        payload_data["img_url"] = None
    elif image is not None or img_url is not None:
        payload_data["img_url"] = await _resolve_image_url(img_url=img_url, image=image)

    payload = TechnologyUpdate(**payload_data)
    return technologies_service.update_technology(db, technology_id, payload)


@router.delete("/{technology_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_technology(technology_id: int, db: DBSession, admin_user: AdminUser):
    technologies_service.delete_technology(db, technology_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


async def _resolve_image_url(
    *,
    img_url: str | None,
    image: UploadFile | None,
) -> str | None:
    if image is not None:
        return await technologies_service.save_technology_image(image)

    return normalize_optional_text(img_url)
