from sqlalchemy import Column, Date, Integer, String, Text

from app.db.base import Base


class Experience(Base):
    __tablename__ = "experience"

    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    company = Column(String(255))
    description = Column(Text)
    start_date = Column(Date)
    end_date = Column(Date)
