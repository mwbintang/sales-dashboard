from fastapi import APIRouter, HTTPException
from typing import List
from ..services import get_sales_data
from ..models import DataResponse

router = APIRouter()

@router.get("/", response_model=DataResponse)
def get_sales():
    data = get_sales_data()
    return data
