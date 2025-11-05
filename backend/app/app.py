from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router
from app.core.config import settings


app = FastAPI(title=settings.PROJECT_NAME)


app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Reframe AI is running"}