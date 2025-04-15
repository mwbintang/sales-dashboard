from fastapi import APIRouter, HTTPException
from typing import List
from ..services import get_sales_data
from ..interfaces import DataResponse
from ..core import raise_custom_error

router = APIRouter()


@router.get("/", response_model=DataResponse)
def get_sales():
    """
    Get all sales representatives data.
    """

    data = get_sales_data() 
    return data