

from fastapi import APIRouter, HTTPException
from app.schemas.feedback import FeedBackRequest, FeedbackResponse, FeedbackItem
from app.services.feedback_agent import evaluate_answer, transcribe_audio_from_url


router = APIRouter()


@router.post("", response_model=FeedbackResponse)
def feedback(data: FeedBackRequest):
    try:
        results = []
        for ans in data.answers:
            answer_text = ans.answer_text

            if not answer_text and ans.audio_url:
                try:
                    answer_text = transcribe_audio_from_url(ans.audio_url)
                except Exception as e:
                    answer_text = f"(Audio transcription failed: {e})"

            if not answer_text:
                raise HTTPException(status_code=400, detail="Missing answer_text or valid audio_url")
            
            eval_result = evaluate_answer(ans.question, answer_text)
            results.append(
                FeedbackItem(
                    question=ans.question,
                    score=eval_result.get("score"),
                    feedback=eval_result.get("feedback")
                )
            )
        return FeedbackResponse(role=data.role, results=results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))