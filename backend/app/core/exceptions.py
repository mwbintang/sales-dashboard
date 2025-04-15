from fastapi import HTTPException
from ..interfaces import ErrorResponseModel


def raise_custom_error(
    status_code: int = 400, message: str = "An error occurred", data: dict | None = None
):
    error_response = ErrorResponseModel(success=False, message=message, data=data or {})

    raise HTTPException(status_code=status_code, detail=error_response.dict())
