from datetime import date

from pydantic import Field

from app.schemas.base import AppSchema


class ExperienceBase(AppSchema):
    title: str = Field(..., max_length=255)
    company: str | None = Field(default=None, max_length=255)
    description: str | None = None
    start_date: date | None = None
    end_date: date | None = None


class ExperienceCreate(ExperienceBase):
    pass


class ExperienceUpdate(AppSchema):
    title: str | None = Field(default=None, max_length=255)
    company: str | None = Field(default=None, max_length=255)
    description: str | None = None
    start_date: date | None = None
    end_date: date | None = None


class ExperienceRead(ExperienceBase):
    id: int
