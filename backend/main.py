from contextlib import asynccontextmanager

from fastapi import FastAPI

from app import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root():
    return {"message": "Hola Mundo"}
