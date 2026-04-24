from fastapi import APIRouter

from app.api.routes.contact_messages import router as contact_messages_router
from app.api.routes.experiences import router as experiences_router
from app.api.routes.projects import router as projects_router
from app.api.routes.technologies import router as technologies_router
from app.api.routes.users import router as users_router

api_router = APIRouter(prefix="/api")
api_router.include_router(users_router)
api_router.include_router(technologies_router)
api_router.include_router(projects_router)
api_router.include_router(experiences_router)
api_router.include_router(contact_messages_router)
