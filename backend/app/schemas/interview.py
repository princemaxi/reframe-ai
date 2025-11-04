from pydantic import BaseModel


class InterviewGenerateRequest(BaseModel):
    user_id: str
    role: str
    level: str = "entry"


class InterviewResponse(BaseModel):
    user_id: str
    role: str
    questions: dict