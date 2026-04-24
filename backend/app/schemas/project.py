from datetime import datetime

from pydantic import Field

from app.schemas.base import AppSchema
from app.schemas.project_image import ProjectImageCreate, ProjectImageRead
from app.schemas.technology import TechnologyRead


class ProjectBase(AppSchema):
    title: str = Field(..., max_length=255)
    description: str | None = None
    demo_url: str | None = None
    repo_url: str | None = None


class ProjectCreate(ProjectBase):
    images: list[ProjectImageCreate] = Field(default_factory=list)
    technology_ids: list[int] = Field(default_factory=list)


class ProjectUpdate(AppSchema):
    title: str | None = Field(default=None, max_length=255)
    description: str | None = None
    demo_url: str | None = None
    repo_url: str | None = None
    images: list[ProjectImageCreate] | None = None
    technology_ids: list[int] | None = None


class ProjectRead(ProjectBase):
    id: int
    created_at: datetime
    images: list[ProjectImageRead] = Field(default_factory=list)


class ProjectReadWithTechnologies(ProjectRead):
    technologies: list[TechnologyRead] = Field(default_factory=list)
