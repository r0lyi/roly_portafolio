from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import quoted_name

from app.db.base import Base
from app.models.association import project_tech


class Technology(Base):
    __tablename__ = "technology"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    img_url = Column(Text)
    group = Column(quoted_name("group", True), String(100))
    order = Column(quoted_name("order", True), Integer)

    projects = relationship("Project", secondary=project_tech, back_populates="technologies")
