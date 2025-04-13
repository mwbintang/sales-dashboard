from pydantic import BaseModel
from typing import Optional

class Question(BaseModel):
    question: str
    
class AiResponse(BaseModel):
    answer: str