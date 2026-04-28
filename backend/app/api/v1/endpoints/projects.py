from fastapi import APIRouter, File, Form, HTTPException, Response, UploadFile, status

from app.api.dependencies import AdminUser, DBSession
from app.api.forms import normalize_optional_text, parse_optional_int
from app.schemas.project import (
    ProjectCreate,
    ProjectReadWithTechnologies,
    ProjectUpdate,
)
from app.schemas.project_image import (
    ProjectImageCreate,
    ProjectImageRead,
    ProjectImageUpdate,
)
from app.services import projects_service

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("/", response_model=list[ProjectReadWithTechnologies])
def list_projects(db: DBSession):
    return projects_service.list_projects(db)


@router.get("/{project_id}", response_model=ProjectReadWithTechnologies)
def get_project(project_id: int, db: DBSession):
    return projects_service.get_project_or_404(db, project_id)


@router.post("/", response_model=ProjectReadWithTechnologies, status_code=status.HTTP_201_CREATED)
def create_project(payload: ProjectCreate, db: DBSession, admin_user: AdminUser):
    return projects_service.create_project(db, payload)


@router.patch("/{project_id}", response_model=ProjectReadWithTechnologies)
def update_project(project_id: int, payload: ProjectUpdate, db: DBSession, admin_user: AdminUser):
    return projects_service.update_project(db, project_id, payload)


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: DBSession, admin_user: AdminUser):
    projects_service.delete_project(db, project_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/{project_id}/images", response_model=list[ProjectImageRead])
def list_project_images(project_id: int, db: DBSession):
    return projects_service.list_project_images(db, project_id)


@router.get("/{project_id}/images/{image_id}", response_model=ProjectImageRead)
def get_project_image(project_id: int, image_id: int, db: DBSession):
    return projects_service.get_project_image_or_404(db, project_id, image_id)


@router.post(
    "/{project_id}/images",
    response_model=ProjectImageRead,
    status_code=status.HTTP_201_CREATED,
)
async def create_project_image(
    project_id: int,
    db: DBSession,
    admin_user: AdminUser,
    position: str | None = Form(default=None),
    image_url: str | None = Form(default=None),
    image: UploadFile | None = File(default=None),
):
    payload = ProjectImageCreate(
        image_url=await _resolve_project_image_url(
            project_id=project_id,
            image_url=image_url,
            image=image,
        ),
        position=parse_optional_int(position, field_name="La posicion") or 0,
    )
    return projects_service.create_project_image(db, project_id, payload)


@router.patch("/{project_id}/images/{image_id}", response_model=ProjectImageRead)
async def update_project_image(
    project_id: int,
    image_id: int,
    db: DBSession,
    admin_user: AdminUser,
    position: str | None = Form(default=None),
    image_url: str | None = Form(default=None),
    image: UploadFile | None = File(default=None),
):
    payload_data = {}

    if position is not None:
        payload_data["position"] = parse_optional_int(
            position,
            field_name="La posicion",
        )

    if image is not None or image_url is not None:
        payload_data["image_url"] = await _resolve_project_image_url(
            project_id=project_id,
            image_url=image_url,
            image=image,
        )

    payload = ProjectImageUpdate(**payload_data)
    return projects_service.update_project_image(db, project_id, image_id, payload)


@router.delete("/{project_id}/images/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project_image(project_id: int, image_id: int, db: DBSession, admin_user: AdminUser):
    projects_service.delete_project_image(db, project_id, image_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


async def _resolve_project_image_url(
    *,
    project_id: int,
    image_url: str | None,
    image: UploadFile | None,
) -> str:
    if image is not None:
        saved_path = await projects_service.save_project_image_file(project_id, image)
        if saved_path:
            return saved_path

    normalized_path = normalize_optional_text(image_url)
    if normalized_path:
        return normalized_path

    raise HTTPException(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        detail="Debes adjuntar una imagen o indicar una ruta valida.",
    )
