from typing import Annotated

from fastapi import Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.services import auth_service

DBSession = Annotated[Session, Depends(get_db)]

basic_security = HTTPBasic(auto_error=False)
BasicCredentials = Annotated[HTTPBasicCredentials | None, Depends(basic_security)]


def get_current_admin(
    db: DBSession,
    credentials: BasicCredentials,
) -> User:
    return auth_service.authenticate_admin(db, credentials)


AdminUser = Annotated[User, Depends(get_current_admin)]
