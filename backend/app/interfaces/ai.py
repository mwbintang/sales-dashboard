from pydantic import BaseModel, Field
from typing import Optional


class Question(BaseModel):
    question: str = Field(..., min_length=1, max_length=255)

class AiResponse(BaseModel):
    answer: str
