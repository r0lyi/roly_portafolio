from fastapi import APIRouter, Response, status

from app.api.dependencies import DBSession
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
def create_technology(payload: TechnologyCreate, db: DBSession):
    return technologies_service.create_technology(db, payload)


@router.patch("/{technology_id}", response_model=TechnologyRead)
def update_technology(technology_id: int, payload: TechnologyUpdate, db: DBSession):
    return technologies_service.update_technology(db, technology_id, payload)


@router.delete("/{technology_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_technology(technology_id: int, db: DBSession):
    technologies_service.delete_technology(db, technology_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
