from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.experience import Experience
from app.schemas.experience import ExperienceCreate, ExperienceUpdate


def list_experiences(db: Session) -> list[Experience]:
    stmt = select(Experience).order_by(Experience.start_date.desc(), Experience.id.desc())
    return db.scalars(stmt).all()


def get_experience_or_404(db: Session, experience_id: int) -> Experience:
    experience = db.get(Experience, experience_id)
    if experience is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found")
    return experience


def create_experience(db: Session, payload: ExperienceCreate) -> Experience:
    experience = Experience(**payload.model_dump())
    db.add(experience)
    db.commit()
    db.refresh(experience)
    return experience


def update_experience(db: Session, experience_id: int, payload: ExperienceUpdate) -> Experience:
    experience = get_experience_or_404(db, experience_id)

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(experience, field, value)

    db.commit()
    db.refresh(experience)
    return experience


def delete_experience(db: Session, experience_id: int) -> None:
    experience = get_experience_or_404(db, experience_id)
    db.delete(experience)
    db.commit()
