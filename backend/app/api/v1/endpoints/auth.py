from fastapi import APIRouter, HTTPException, status

from app.api.dependencies import AdminUser, DBSession
from app.schemas.auth import AuthStatusRead
from app.schemas.user import UserRead
from app.services import auth_service

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.get("/status", response_model=AuthStatusRead)
def get_auth_status(db: DBSession):
    return AuthStatusRead(admin_configured=auth_service.is_admin_configured(db))


@router.post("/setup", status_code=status.HTTP_403_FORBIDDEN)
def setup_admin():
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail=(
            "Admin setup is disabled. The default admin is created automatically "
            "on server startup."
        ),
    )


@router.get("/me", response_model=UserRead)
def get_current_admin_profile(admin_user: AdminUser):
    return admin_user
