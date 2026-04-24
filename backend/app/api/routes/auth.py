from fastapi import APIRouter, status

from app.api.dependencies import AdminUser, DBSession
from app.schemas.auth import AuthStatusRead
from app.schemas.user import UserCreate, UserRead
from app.services import auth_service, users_service

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.get("/status", response_model=AuthStatusRead)
def get_auth_status(db: DBSession):
    return AuthStatusRead(admin_configured=auth_service.is_admin_configured(db))


@router.post("/setup", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def setup_admin(payload: UserCreate, db: DBSession):
    return users_service.create_user(db, payload)


@router.get("/me", response_model=UserRead)
def get_current_admin_profile(admin_user: AdminUser):
    return admin_user
