from pydantic import BaseModel
from typing import List


class InterviewGenerateRequest(BaseModel):
    user_id: str
    role: str
    level: str = "entry"


class InterviewResponse(BaseModel):
    user_id: str
    role: str
    questions: dict


class PlanRequest(BaseModel):
    user_id: str
    role: str
    level: str = "entry"
    time_to_interview: int


class PlanDay(BaseModel):
    day: int
    focus: str 
    recommended_reading: str
    practice_type: str
    duration_minutes: int
    timer_enabled: bool = True

class PlanResponse(BaseModel):
    user_id: str
    role: str
    total_days: int
    plan: List[PlanDay]