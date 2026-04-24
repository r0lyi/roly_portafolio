from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text, func, text

from app.database.base import Base


class ContactMessage(Base):
    __tablename__ = "contact_message"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    send_at = Column(DateTime, nullable=False, server_default=func.now())
    read = Column(Boolean, nullable=False, default=False, server_default=text("FALSE"))
