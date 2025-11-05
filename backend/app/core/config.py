from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "Reframe AI"
    OPENAI_API_KEY: str
    MODEL: str = "gpt-4o-mini"
    
    # --- THIS IS THE FIX ---
    # Cloud Run has a read-only filesystem, except for /tmp
    # We change the path to write to /tmp instead of the root.
    DATA_PATH: str = "/tmp/data/questions"

    class Config:
        env_file = ".env"


settings = Settings()

# This will now succeed because it's writing to /tmp
os.makedirs(settings.DATA_PATH, exist_ok=True)