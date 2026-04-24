from datetime import datetime

from pydantic import Field

from app.schemas.base import AppSchema


class UserBase(AppSchema):
    email: str = Field(..., max_length=255)


class UserCreate(UserBase):
    password_hash: str


class UserUpdate(AppSchema):
    email: str | None = Field(default=None, max_length=255)
    password_hash: str | None = None


class UserRead(UserBase):
    id: int
    created_at: datetime


class UserInDB(UserRead):
    password_hash: str
