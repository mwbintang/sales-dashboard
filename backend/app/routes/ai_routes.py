from fastapi import APIRouter, HTTPException
from ..services import get_sales_data, ask_ai_service
from ..interfaces import Question, AiResponse
from ..core import raise_custom_error
from ..interfaces import (
    ErrorResponseModel,
)

router = APIRouter()


@router.post(
    "/ai", response_model=AiResponse, responses={422: {"model": ErrorResponseModel}}
)
async def ask_ai_routes(payload: Question):
    """
    Ask the AI question based on the sales data.
    """

    try:
        answer = await ask_ai_service(payload.question)
        return answer

    except Exception as e:
        raise_custom_error(
            500, f"An error occurred while processing the question: {str(e)}"
        )
