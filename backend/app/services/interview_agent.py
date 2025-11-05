import os, json, time, asyncio, random
from app.core.openai_client import client
from app.core.config import settings
from app.utils import goals, readings


def _role_slug(role: str) -> str:
    return role.lower().replace(" ", "_")

def _file_path(user_id: str, role: str) -> str:
    filename = f"{user_id}_{_role_slug(role)}.json"
    return os.path.join(settings.DATA_PATH, filename)

async def generate_category_questions(role: str, category: str, level: str = "entry") -> list[str]:

    def blocking_call():
        prompt = f"""Generate around 15 {category} intrview questions for a {level}-level {role} candidate. 
        Format as a numbered list no introduction, no commentary, no markdown, no numbering, no explanations.
        Example: ["Question 1", "Question 2", ...]
        """

        return client.chat.completions.create(
            model=settings.MODEL,
            messages=[{"role": "user", "content": prompt.strip()}],
        )
    
    res = await asyncio.to_thread(blocking_call)
    text = res.choices[0].message.content.strip()

    try:
        questions = json.loads(text)
    except Exception:
        questions = [line.strip("-•0123456789. ") for line in text.split("\n") if "?" in line]

    questions = [q for q in questions if not q.lower().startswith("sure")]
    return questions[:15]

async def generate_or_load_questions(user_id: str, role: str, level: str= "entry") -> dict:
    path = _file_path(user_id, role)

    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
        
    categories = ["background", "technical", "situational"]
    
    tasks = [generate_category_questions(role, cat, level) for cat in categories]
    results = await asyncio.gather(*tasks)
    questions = dict(zip(categories, results))

    data = {
        "user_id": user_id,
        "role": role,
        "created_at": time.strftime("%y-%m-%dT%H:%M:%SZ"),
        "questions": questions,
    }

    os.makedirs(settings.DATA_PATH, exist_ok=True)
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
    return data

def get_cached_questions(user_id: str, role: str):
    path = _file_path(user_id, role)

    if not os.path.exists(path):
        return None
    
    with open(path, "r") as f:
        return json.load(f)
    
async def generate_interview_plan(user_id: str, role: str, level: str, time_to_interview: int):
    focus_areas = ["background", "technical", "situational"]
    plan = []
    random.seed(user_id + role)

    for day in range(1, time_to_interview + 1):
        focus = random.choice(focus_areas)

        duration = random.choice([45, 60, 75, 90])

        goal = random.choice(goals[focus])

        plan.append(
            {
                "day": day,
                "focus": focus,
                "goal": goal,
                "recommended_reading": readings[focus],
                "practice_type": "mixed (background + technical + situational)",
                "duration_minutes": duration,
                "timer_enabled": True
            }
        )

    data = {
        "user_id": user_id,
        "role": role,
        "total_days": time_to_interview,
        "plan": plan
    }

    return data


