# 🧠 Sales Dashboard AI Backend

A FastAPI backend service that provides sales data and answers questions using Cohere's AI model.

---

## 🛠️ Tech Stack

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Language**: Python 3.12+
- **Model API**: [Cohere](https://cohere.com/)
- **Server**: Uvicorn
- **Tools**: Makefile, Pydantic, JSON

---

## 📁 Project Structure

backend/
├── app/
│   ├── core/                  # App configurations and constants
│   │   └── __init__.py
│   │   └── cohere_client.py
│   │   └── config.py
│   ├── data/                  # Mock data for sales reps
│   │   └── mock_sales_data.json      
│   ├── interfaces/            # Pydantic models / schemas
│   │   ├── __init__.py
│   │   └── ai.py
│   │   └── data.py
│   ├── routes/                # All API route declarations
│   │   ├── __init__.py
│   │   ├── sales_routes.py
│   │   └── ai_routes.py       # Cohere AI endpoint
│   ├── services/              # Business logic and utility functions
│   │   ├── __init__.py
│   │   ├── sales_service.py
│   │   └── ai_service.py
│   └── main.py                # FastAPI app instance
├── requirements.txt
└── Makefile

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
make install-backend
```

### 2. Create .env file

COHERE_API_KEY=your-cohere-api-key

### 3. Run the backend

```bash
make run-backend
```

---

## 📌 Available API Endpoints

### 1. Get Sales Data

**GET** `/api/data/`  
Returns structured sales data.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Alice",
    "region": "North America",
    ...
  },
  ...
]
```

### 2. Ask AI

**POST** `/api/ai/`  
Returns structured answer from AI.

**Request Body:**
```json
{
  "question": "Which sales rep closed the most deals?"
}
```

**Response Body:**
```json
{
  "answer": "Alice has closed the most deals with 3 successful deals."
}
```

---

# Potential Improvements

While the current implementation serves its purpose, there are several ways to enhance the project for better performance, scalability, and user experience. Below are some suggestions for potential improvements:

---
## 1. **Logging and Monitoring**

**Current State:**  
- The current implementation does not include any logging mechanisms.

**Improvement:**  
- Implement proper logging using Python's built-in `logging` module or third-party libraries like **Loguru**. This will help in tracking errors, API usage, and performance bottlenecks.
- Example:
  - Log API access:
    ```python
    import logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    @app.get("/")
    def read_root():
        logger.info("Root endpoint accessed")
        return {"message": "Hello World"}
    ```
- Integrate with monitoring tools like **Prometheus**, **Datadog**, or **New Relic** for better visibility into system health and API performance.

---

## 2. **Caching for Performance Optimization**

**Current State:**  
- The application does not seem to leverage caching.

**Improvement:**  
- Introduce caching mechanisms (e.g., using **Redis** or **in-memory caching**) for frequently requested data, such as sales reports or AI responses. This can help reduce the load on the backend and improve performance.
  - Example: Use **FastAPI's Cache Dependencies** to cache data for a set period of time.

---

## 3. **Authentication and Authorization**

**Current State:**  
- The API does not yet implement any form of authentication or authorization.

**Improvement:**  
- Add support for **OAuth2** or **JWT tokens** for secure access to the API. This is especially important if the API will be used in production or exposed to the internet.
- Example using **FastAPI OAuth2**:
  ```python
  from fastapi import Depends, HTTPException, status
  from fastapi.security import OAuth2PasswordBearer
  
  oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
  
  def get_current_user(token: str = Depends(oauth2_scheme)):
      user = verify_token(token)  # Implement token verification
      if not user:
          raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
      return user

---