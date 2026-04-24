from fastapi import APIRouter, Response, status

from app.api.dependencies import DBSession
from app.schemas.project import ProjectCreate, ProjectReadWithTechnologies, ProjectUpdate
from app.schemas.project_image import ProjectImageCreate, ProjectImageRead, ProjectImageUpdate
from app.services import projects_service

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("/", response_model=list[ProjectReadWithTechnologies])
def list_projects(db: DBSession):
    return projects_service.list_projects(db)


@router.get("/{project_id}", response_model=ProjectReadWithTechnologies)
def get_project(project_id: int, db: DBSession):
    return projects_service.get_project_or_404(db, project_id)


@router.post("/", response_model=ProjectReadWithTechnologies, status_code=status.HTTP_201_CREATED)
def create_project(payload: ProjectCreate, db: DBSession):
    return projects_service.create_project(db, payload)


@router.patch("/{project_id}", response_model=ProjectReadWithTechnologies)
def update_project(project_id: int, payload: ProjectUpdate, db: DBSession):
    return projects_service.update_project(db, project_id, payload)


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: DBSession):
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
def create_project_image(project_id: int, payload: ProjectImageCreate, db: DBSession):
    return projects_service.create_project_image(db, project_id, payload)


@router.patch("/{project_id}/images/{image_id}", response_model=ProjectImageRead)
def update_project_image(project_id: int, image_id: int, payload: ProjectImageUpdate, db: DBSession):
    return projects_service.update_project_image(db, project_id, image_id, payload)


@router.delete("/{project_id}/images/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project_image(project_id: int, image_id: int, db: DBSession):
    projects_service.delete_project_image(db, project_id, image_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
