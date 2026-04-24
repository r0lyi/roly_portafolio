from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.services import auth_service


def list_users(db: Session) -> list[User]:
    stmt = select(User).order_by(User.created_at.desc(), User.id.desc())
    return db.scalars(stmt).all()


def get_user_or_404(db: Session, user_id: int) -> User:
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


def create_user(db: Session, payload: UserCreate) -> User:
    auth_service.ensure_admin_not_configured(db)

    normalized_email = payload.email.strip().lower()
    existing_user = db.scalar(select(User).where(User.email == normalized_email))
    if existing_user is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    user = User(
        email=normalized_email,
        password_hash=auth_service.hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def ensure_default_admin(db: Session, *, email: str, password: str) -> User:
    normalized_email = email.strip().lower()
    stmt = select(User).order_by(User.created_at.asc(), User.id.asc())
    users = db.scalars(stmt).all()

    if len(users) > 1:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="More than one admin user is configured",
        )

    if not users:
        user = User(
            email=normalized_email,
            password_hash=auth_service.hash_password(password),
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    user = users[0]
    should_update = False

    if user.email != normalized_email:
        user.email = normalized_email
        should_update = True

    if not auth_service.verify_password(password, user.password_hash):
        user.password_hash = auth_service.hash_password(password)
        should_update = True

    if should_update:
        db.commit()
        db.refresh(user)

    return user


def update_user(db: Session, user_id: int, payload: UserUpdate) -> User:
    user = get_user_or_404(db, user_id)
    update_data = payload.model_dump(exclude_unset=True)

    email = update_data.get("email")
    if email and email != user.email:
        normalized_email = email.strip().lower()
        existing_user = db.scalar(select(User).where(User.email == normalized_email))
        if existing_user is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
        user.email = normalized_email

    password = update_data.get("password")
    if password:
        user.password_hash = auth_service.hash_password(password)

    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user_id: int) -> None:
    user = get_user_or_404(db, user_id)
    db.delete(user)
    db.commit()
