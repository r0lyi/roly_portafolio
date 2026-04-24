from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api.router import api_router
from app.services.database_service import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title="Portfolio API",
    lifespan=lifespan,
)

app.include_router(api_router)

@app.get("/")
def read_root():
    return {"message": "Portfolio API running"}
