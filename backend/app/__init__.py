from . import models
from .database.base import Base
from .database.connection import engine


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
