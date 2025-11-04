from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "Reframe AI"
    OPENAI_API_KEY: str
    MODEL: str = "gpt-4o-mini"
    DATA_PATH: str = os.path.join(os.getcwd(), "data/questions")

    class Config:
        env_file = ".env"


settings = Settings()
os.makedirs(settings.DATA_PATH, exist_ok=True)