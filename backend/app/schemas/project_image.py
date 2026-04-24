from datetime import datetime

from app.schemas.base import AppSchema


class ProjectImageBase(AppSchema):
    image_url: str
    position: int = 0


class ProjectImageCreate(ProjectImageBase):
    pass


class ProjectImageUpdate(AppSchema):
    image_url: str | None = None
    position: int | None = None


class ProjectImageRead(ProjectImageBase):
    id: int
    project_id: int
    created_at: datetime
