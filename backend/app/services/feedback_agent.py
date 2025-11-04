import io, requests, json
from app.core.openai_client import client
from app.core.config import settings



def transcribe_audio_from_url(audio_url: str)-> str:
    response = requests.get(audio_url)
    if response.status_code != 200:
        raise Exception("Failed to download audio")
    audio_bytes = io.BytesIO(response.content)
    transcript = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_bytes
    )
    return transcript.text.strip()

def evaluate_answer(question: str, answer_text: str) -> dict:
    prompt = f"""
    You are an interview evalutor. Score the following candidate answer (1 - 9) and give concise feedback.
    Question: {question}
    Answer: {answer_text}

    Return JSON with fields: score (number) and feedback (string) no introduction, no commentary, no markdown, no numbering, no explanations.
    
    """

    res = client.chat.completions.create(
        model=settings.MODEL,
        messages=[{"role": "user", "content": prompt}]
    )

    text = res.choices[0].message.content.strip()

    try:
        parsed = json.loads(text)
    except:
        parsed = {"score": None, "feedback": text}
    return parsed