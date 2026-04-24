from sqlalchemy import Column, DateTime, Integer, String, Text, func
from sqlalchemy.orm import relationship

from app.database.base import Base
from app.models.association import project_tech


class Project(Base):
    __tablename__ = "project"

    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    demo_url = Column(Text)
    repo_url = Column(Text)
    created_at = Column(DateTime, nullable=False, server_default=func.now())

    technologies = relationship("Technology", secondary=project_tech, back_populates="projects")
    images = relationship(
        "ProjectImage",
        back_populates="project",
        cascade="all, delete-orphan",
        order_by="ProjectImage.position",
    )
