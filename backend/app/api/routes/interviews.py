

from fastapi import APIRouter, HTTPException
from app.schemas.interview import (
    InterviewGenerateRequest, 
    InterviewResponse,
    PlanRequest,
    PlanResponse
)
from app.services.interview_agent import (
    generate_or_load_questions, 
    get_cached_questions,
    generate_interview_plan
)


router = APIRouter()

@router.post("/generate", response_model=InterviewResponse)
async def generate_questions(data: InterviewGenerateRequest):
    try:
        result = await generate_or_load_questions(data.user_id, data.role, data.level)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/questions/{user_id}/{role}", response_model=InterviewResponse)
def get_questions(user_id: str, role: str):
    questions = get_cached_questions(user_id, role)
    if not questions:
        raise HTTPException(status_code=404, detail="No cached questions found")
    return questions

@router.post("/plan", response_model=PlanResponse)
async def generate_plan(data: PlanRequest):
    try:
        plan = await generate_interview_plan(data.user_id, data.role, data.level, data.time_to_interview)
        return plan
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))