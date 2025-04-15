import json
import os
from ..core import raise_custom_error


def get_sales_data():
    try:
        file_path = os.path.join(
            os.path.dirname(__file__), "..", "data", "mock_sales_data.json"
        )
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        raise_custom_error(status_code=404, message="Sales data file not found")
    except json.JSONDecodeError:
        raise_custom_error(status_code=500, message="Failed to parse sales data")
    except Exception as e:
        raise_custom_error(status_code=500, message=str(e))
