
from pydantic import BaseModel
from typing import List, Optional

class AnswerItem(BaseModel):
    question: str
    answer_text: Optional[str] = None
    audio_url: Optional[str] = None


class FeedBackRequest(BaseModel):
    user_id: str
    role: str
    answers: List[AnswerItem]

class FeedbackItem(BaseModel):
    question: str
    score: float | None
    feedback: str

class FeedbackResponse(BaseModel):
    role: str
    results: List[FeedbackItem]