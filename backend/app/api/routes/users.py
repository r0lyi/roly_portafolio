from fastapi import APIRouter, Response, status

from app.api.dependencies import AdminUser, DBSession
from app.schemas.user import UserCreate, UserRead, UserUpdate
from app.services import users_service

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/", response_model=list[UserRead])
def list_users(db: DBSession, admin_user: AdminUser):
    return users_service.list_users(db)


@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, db: DBSession, admin_user: AdminUser):
    return users_service.get_user_or_404(db, user_id)


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(payload: UserCreate, db: DBSession, admin_user: AdminUser):
    return users_service.create_user(db, payload)


@router.patch("/{user_id}", response_model=UserRead)
def update_user(user_id: int, payload: UserUpdate, db: DBSession, admin_user: AdminUser):
    return users_service.update_user(db, user_id, payload)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: DBSession, admin_user: AdminUser):
    users_service.delete_user(db, user_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
