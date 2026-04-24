from sqlalchemy import Column, DateTime, ForeignKey, Integer, Text, func, text
from sqlalchemy.orm import relationship

from app.database.base import Base


class ProjectImage(Base):
    __tablename__ = "project_image"

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("project.id", ondelete="CASCADE"), nullable=False)
    image_url = Column(Text, nullable=False)
    position = Column(Integer, nullable=False, default=0, server_default=text("0"))
    created_at = Column(DateTime, nullable=False, server_default=func.now())

    project = relationship("Project", back_populates="images")
