import json
import os
from .sales_service import get_sales_data
from ..core import co

async def ask_ai_service(question: str):
    sales_data = get_sales_data()
    prompt = f"""You are an AI assistant with access to a sales database. Answer the question based only on the following JSON data:

{json.dumps(sales_data, indent=2)}

Question: {question}
Answer:"""

    response = co.generate(
        model="command-r-plus",  # or "command-light" for faster results
        prompt=prompt,
        max_tokens=200,
        temperature=0.3
    )

    return {"answer": response.generations[0].text.strip()}