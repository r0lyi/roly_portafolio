from sqlalchemy import Column, ForeignKey, Integer, Table

from app.db.base import Base

project_tech = Table(
    "project_tech",
    Base.metadata,
    Column("project_id", Integer, ForeignKey("project.id", ondelete="CASCADE"), primary_key=True),
    Column("tech_id", Integer, ForeignKey("technology.id", ondelete="CASCADE"), primary_key=True),
)
