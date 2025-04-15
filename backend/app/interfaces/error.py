from pydantic import BaseModel


class ErrorResponseModel(BaseModel):
    success: bool = False
    message: str
    data: dict | None = None
