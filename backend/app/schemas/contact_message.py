from datetime import datetime

from pydantic import Field

from app.schemas.base import AppSchema


class ContactMessageBase(AppSchema):
    name: str = Field(..., max_length=255)
    email: str = Field(..., max_length=255)
    message: str


class ContactMessageCreate(ContactMessageBase):
    pass


class ContactMessageUpdate(AppSchema):
    name: str | None = Field(default=None, max_length=255)
    email: str | None = Field(default=None, max_length=255)
    message: str | None = None
    read: bool | None = None


class ContactMessageRead(ContactMessageBase):
    id: int
    send_at: datetime
    read: bool
