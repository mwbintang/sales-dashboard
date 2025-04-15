import json
import os
from .sales_service import get_sales_data
from ..core import co, raise_custom_error


async def ask_ai_service(question: str):
    try:
        sales_data = get_sales_data()
        prompt = f"""You are an AI assistant with access to a sales database. Answer the question based only on the following JSON data:

        {json.dumps(sales_data, indent=2)}

        Question: {question}
        Answer:"""

        response = co.generate(
            model="command-r-plus",
            prompt=prompt,
            max_tokens=200,
            temperature=0.3,
        )

        return {"answer": response.generations[0].text.strip()}
    except KeyError as e:
        raise_custom_error(
            status_code=500, message=f"Missing expected data field: {str(e)}"
        )
    except Exception as e:
        raise_custom_error(status_code=500, message=f"AI service error: {str(e)}")
