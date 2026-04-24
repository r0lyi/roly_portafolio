from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.technology import Technology
from app.schemas.technology import TechnologyCreate, TechnologyUpdate


def list_technologies(db: Session) -> list[Technology]:
    stmt = select(Technology).order_by(Technology.order.asc().nulls_last(), Technology.name.asc())
    return db.scalars(stmt).all()


def get_technology_or_404(db: Session, technology_id: int) -> Technology:
    technology = db.get(Technology, technology_id)
    if technology is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Technology not found")
    return technology


def create_technology(db: Session, payload: TechnologyCreate) -> Technology:
    technology = Technology(**payload.model_dump())
    db.add(technology)
    db.commit()
    db.refresh(technology)
    return technology


def update_technology(db: Session, technology_id: int, payload: TechnologyUpdate) -> Technology:
    technology = get_technology_or_404(db, technology_id)

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(technology, field, value)

    db.commit()
    db.refresh(technology)
    return technology


def delete_technology(db: Session, technology_id: int) -> None:
    technology = get_technology_or_404(db, technology_id)
    db.delete(technology)
    db.commit()
