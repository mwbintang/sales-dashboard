import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    COHERE_API_KEY = os.getenv("COHERE_API_KEY")
    ALLOWED_ORIGINS = ["http://localhost:3000"]


settings = Settings()
