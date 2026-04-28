from fastapi import APIRouter, Response, status

from app.api.dependencies import AdminUser, DBSession
from app.schemas.contact_message import (
    ContactMessageCreate,
    ContactMessageRead,
    ContactMessageUpdate,
)
from app.services import contact_messages_service

router = APIRouter(prefix="/contact-messages", tags=["Contact Messages"])


@router.get("/", response_model=list[ContactMessageRead])
def list_contact_messages(db: DBSession, admin_user: AdminUser):
    return contact_messages_service.list_contact_messages(db)


@router.get("/{message_id}", response_model=ContactMessageRead)
def get_contact_message(message_id: int, db: DBSession, admin_user: AdminUser):
    return contact_messages_service.get_contact_message_or_404(db, message_id)


@router.post("/", response_model=ContactMessageRead, status_code=status.HTTP_201_CREATED)
def create_contact_message(payload: ContactMessageCreate, db: DBSession):
    return contact_messages_service.create_contact_message(db, payload)


@router.patch("/{message_id}", response_model=ContactMessageRead)
def update_contact_message(
    message_id: int,
    payload: ContactMessageUpdate,
    db: DBSession,
    admin_user: AdminUser,
):
    return contact_messages_service.update_contact_message(db, message_id, payload)


@router.delete("/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact_message(message_id: int, db: DBSession, admin_user: AdminUser):
    contact_messages_service.delete_contact_message(db, message_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
