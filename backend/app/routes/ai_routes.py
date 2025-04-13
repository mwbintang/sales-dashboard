from fastapi import APIRouter, HTTPException
from ..services import get_sales_data, ask_ai_service
from ..models import Question, AiResponse

router = APIRouter()

@router.post("/", response_model=AiResponse)
async def ask_ai_routes(payload: Question):
    question = payload.question.strip()
    answer = await ask_ai_service(question)

    return answer