from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api.router import api_router
from app.core.config import get_settings
from app.db.bootstrap import init_db


def create_application() -> FastAPI:
    settings = get_settings()

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        init_db()
        yield

    application = FastAPI(
        title=settings.app_name,
        debug=settings.debug,
        lifespan=lifespan,
    )
    application.include_router(api_router)
    application.mount(
        settings.public_image_url_prefix,
        StaticFiles(directory=settings.public_image_dir, check_dir=False),
        name="public-images",
    )

    @application.get("/", tags=["System"])
    def read_root():
        return {"message": f"{settings.app_name} running"}

    return application
