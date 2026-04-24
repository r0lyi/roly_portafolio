import secrets

from fastapi import HTTPException, status
from fastapi.security import HTTPBasicCredentials
from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User

pwd_context = CryptContext(schemes=["argon2", "bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


def is_admin_configured(db: Session) -> bool:
    return _get_admin_user(db) is not None


def ensure_admin_not_configured(db: Session) -> None:
    if is_admin_configured(db):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Only one admin user is allowed",
        )


def authenticate_admin(
    db: Session,
    credentials: HTTPBasicCredentials | None,
) -> User:
    if credentials is None:
        raise _unauthorized_error()

    admin_user = _get_admin_user(db)
    if admin_user is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Admin user is not configured",
        )

    credential_email = credentials.username.strip().lower()
    user_email = admin_user.email.strip().lower()
    email_matches = secrets.compare_digest(credential_email, user_email)
    if not email_matches:
        raise _unauthorized_error()

    valid_password, new_hash = pwd_context.verify_and_update(
        credentials.password,
        admin_user.password_hash,
    )
    if not valid_password:
        raise _unauthorized_error()

    if new_hash:
        admin_user.password_hash = new_hash
        db.commit()
        db.refresh(admin_user)

    return admin_user


def _get_admin_user(db: Session) -> User | None:
    stmt = select(User).order_by(User.created_at.asc(), User.id.asc())
    users = db.scalars(stmt).all()

    if not users:
        return None

    if len(users) > 1:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="More than one admin user is configured",
        )

    return users[0]


def _unauthorized_error() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid admin credentials",
        headers={"WWW-Authenticate": "Basic"},
    )
