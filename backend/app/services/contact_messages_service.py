from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.contact_message import ContactMessage
from app.schemas.contact_message import ContactMessageCreate, ContactMessageUpdate


def list_contact_messages(db: Session) -> list[ContactMessage]:
    stmt = select(ContactMessage).order_by(ContactMessage.read.asc(), ContactMessage.send_at.desc())
    return db.scalars(stmt).all()


def get_contact_message_or_404(db: Session, message_id: int) -> ContactMessage:
    message = db.get(ContactMessage, message_id)
    if message is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact message not found")
    return message


def create_contact_message(db: Session, payload: ContactMessageCreate) -> ContactMessage:
    message = ContactMessage(**payload.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


def update_contact_message(db: Session, message_id: int, payload: ContactMessageUpdate) -> ContactMessage:
    message = get_contact_message_or_404(db, message_id)

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(message, field, value)

    db.commit()
    db.refresh(message)
    return message


def delete_contact_message(db: Session, message_id: int) -> None:
    message = get_contact_message_or_404(db, message_id)
    db.delete(message)
    db.commit()
