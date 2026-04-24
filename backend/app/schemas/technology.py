from pydantic import Field

from app.schemas.base import AppSchema


class TechnologyBase(AppSchema):
    name: str = Field(..., max_length=100)
    group: str | None = Field(default=None, max_length=100)
    order: int | None = None


class TechnologyCreate(TechnologyBase):
    pass


class TechnologyUpdate(AppSchema):
    name: str | None = Field(default=None, max_length=100)
    group: str | None = Field(default=None, max_length=100)
    order: int | None = None


class TechnologyRead(TechnologyBase):
    id: int
