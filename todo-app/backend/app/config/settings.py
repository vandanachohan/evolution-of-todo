 # app/config/settings.py
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    DATABASE_URL: Optional[str] = None
    SECRET_KEY: str = "b5437c6c139c82cf72e1b6a63002f590f01e924df5167b2cc0fe0a804e2b2534"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    NEXT_PUBLIC_API_URL: Optional[str] = None  # Added to fix extra input error

    class Config:
        env_file = ".env"          # load environment variables from .env
        extra = "allow"            # allows any extra env variables

# Instantiate the settings object
settings = Settings()
