from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models.project import Project
from app.models.project_image import ProjectImage
from app.models.technology import Technology
from app.schemas.project import ProjectCreate, ProjectUpdate
from app.schemas.project_image import ProjectImageCreate, ProjectImageUpdate

PROJECT_LOAD_OPTIONS = (
    selectinload(Project.technologies),
    selectinload(Project.images),
)


def list_projects(db: Session) -> list[Project]:
    stmt = (
        select(Project)
        .options(*PROJECT_LOAD_OPTIONS)
        .order_by(Project.created_at.desc(), Project.id.desc())
    )
    return db.scalars(stmt).all()


def get_project_or_404(db: Session, project_id: int) -> Project:
    stmt = (
        select(Project)
        .options(*PROJECT_LOAD_OPTIONS)
        .where(Project.id == project_id)
    )
    project = db.scalars(stmt).first()
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project


def create_project(db: Session, payload: ProjectCreate) -> Project:
    project = Project(
        **payload.model_dump(exclude={"images", "technology_ids"})
    )
    project.technologies = _load_technologies(db, payload.technology_ids)
    project.images = _build_project_images(payload.images)

    db.add(project)
    db.commit()
    return get_project_or_404(db, project.id)


def update_project(db: Session, project_id: int, payload: ProjectUpdate) -> Project:
    project = get_project_or_404(db, project_id)
    update_data = payload.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        if field in {"images", "technology_ids"}:
            continue
        setattr(project, field, value)

    if "technology_ids" in update_data:
        technology_ids = update_data["technology_ids"] or []
        project.technologies = _load_technologies(db, technology_ids)

    if "images" in update_data:
        project.images = _build_project_images(update_data["images"])

    db.commit()
    return get_project_or_404(db, project.id)


def delete_project(db: Session, project_id: int) -> None:
    project = get_project_or_404(db, project_id)
    db.delete(project)
    db.commit()


def list_project_images(db: Session, project_id: int) -> list[ProjectImage]:
    get_project_or_404(db, project_id)
    stmt = (
        select(ProjectImage)
        .where(ProjectImage.project_id == project_id)
        .order_by(ProjectImage.position.asc(), ProjectImage.id.asc())
    )
    return db.scalars(stmt).all()


def get_project_image_or_404(db: Session, project_id: int, image_id: int) -> ProjectImage:
    get_project_or_404(db, project_id)
    stmt = select(ProjectImage).where(
        ProjectImage.id == image_id,
        ProjectImage.project_id == project_id,
    )
    image = db.scalars(stmt).first()
    if image is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project image not found")
    return image


def create_project_image(db: Session, project_id: int, payload: ProjectImageCreate) -> ProjectImage:
    get_project_or_404(db, project_id)

    image = ProjectImage(project_id=project_id, **payload.model_dump())
    db.add(image)
    db.commit()
    db.refresh(image)
    return image


def update_project_image(
    db: Session,
    project_id: int,
    image_id: int,
    payload: ProjectImageUpdate,
) -> ProjectImage:
    image = get_project_image_or_404(db, project_id, image_id)

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(image, field, value)

    db.commit()
    db.refresh(image)
    return image


def delete_project_image(db: Session, project_id: int, image_id: int) -> None:
    image = get_project_image_or_404(db, project_id, image_id)
    db.delete(image)
    db.commit()


def _load_technologies(db: Session, technology_ids: list[int]) -> list[Technology]:
    unique_ids = _unique_ids(technology_ids)
    if not unique_ids:
        return []

    stmt = select(Technology).where(Technology.id.in_(unique_ids))
    technologies = db.scalars(stmt).all()
    technologies_by_id = {technology.id: technology for technology in technologies}
    missing_ids = [technology_id for technology_id in unique_ids if technology_id not in technologies_by_id]
    if missing_ids:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Technologies not found: {missing_ids}",
        )

    return [technologies_by_id[technology_id] for technology_id in unique_ids]


def _build_project_images(images: list[ProjectImageCreate | dict] | None) -> list[ProjectImage]:
    if not images:
        return []

    project_images: list[ProjectImage] = []
    for image in images:
        image_data = image.model_dump() if hasattr(image, "model_dump") else image
        project_images.append(ProjectImage(**image_data))

    return project_images


def _unique_ids(values: list[int]) -> list[int]:
    seen: set[int] = set()
    unique_values: list[int] = []
    for value in values:
        if value not in seen:
            seen.add(value)
            unique_values.append(value)
    return unique_values
