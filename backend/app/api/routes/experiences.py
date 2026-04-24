from fastapi import APIRouter, Response, status

from app.api.dependencies import DBSession
from app.schemas.experience import ExperienceCreate, ExperienceRead, ExperienceUpdate
from app.services import experiences_service

router = APIRouter(prefix="/experiences", tags=["Experiences"])

@router.get("/", response_model=list[ExperienceRead])
def list_experiences(db: DBSession):
    return experiences_service.list_experiences(db)


@router.get("/{experience_id}", response_model=ExperienceRead)
def get_experience(experience_id: int, db: DBSession):
    return experiences_service.get_experience_or_404(db, experience_id)


@router.post("/", response_model=ExperienceRead, status_code=status.HTTP_201_CREATED)
def create_experience(payload: ExperienceCreate, db: DBSession):
    return experiences_service.create_experience(db, payload)


@router.patch("/{experience_id}", response_model=ExperienceRead)
def update_experience(experience_id: int, payload: ExperienceUpdate, db: DBSession):
    return experiences_service.update_experience(db, experience_id, payload)


@router.delete("/{experience_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_experience(experience_id: int, db: DBSession):
    experiences_service.delete_experience(db, experience_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
