from fastapi import APIRouter

from app.api.v1.endpoints.auth import router as auth_router
from app.api.v1.endpoints.contact_messages import router as contact_messages_router
from app.api.v1.endpoints.experiences import router as experiences_router
from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.projects import router as projects_router
from app.api.v1.endpoints.technologies import router as technologies_router
from app.api.v1.endpoints.users import router as users_router
from app.core.config import get_settings

settings = get_settings()

api_router = APIRouter(prefix=settings.api_prefix)
api_router.include_router(health_router)
api_router.include_router(auth_router)
api_router.include_router(users_router)
api_router.include_router(technologies_router)
api_router.include_router(projects_router)
api_router.include_router(experiences_router)
api_router.include_router(contact_messages_router)
