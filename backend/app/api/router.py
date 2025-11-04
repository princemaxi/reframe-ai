
from fastapi import APIRouter
from app.api.routes import interviews, feedback

api_router = APIRouter()
api_router.include_router(interviews.router, prefix="/interviews", tags=["interviews"])
api_router.include_router(feedback.router, prefix="/feedback", tags=["feedback"])

