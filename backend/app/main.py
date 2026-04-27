from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api.router import api_router
from app.services.database_service import init_db

PUBLIC_IMAGE_DIRECTORY = Path(__file__).resolve().parents[2] / "frontend" / "public" / "img"


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title="Portfolio API",
    lifespan=lifespan,
)

app.include_router(api_router)
app.mount("/img", StaticFiles(directory=PUBLIC_IMAGE_DIRECTORY), name="public-images")

@app.get("/")
def read_root():
    return {"message": "Portfolio API running"}
