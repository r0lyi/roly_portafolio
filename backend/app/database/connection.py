from app.core.config import get_settings
from app.db.session import engine

settings = get_settings()
DATABASE_URL = settings.database_url

__all__ = ["DATABASE_URL", "engine", "settings"]
