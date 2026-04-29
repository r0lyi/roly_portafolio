from datetime import datetime

from pydantic import Field

from app.schemas.base import AppSchema


class UserBase(AppSchema):
    email: str = Field(..., max_length=255)


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserUpdate(AppSchema):
    email: str | None = Field(default=None, max_length=255)
    password: str | None = Field(default=None, min_length=8)


class UserRead(UserBase):
    id: int
    created_at: datetime


class UserInDB(UserRead):
    password_hash: str
