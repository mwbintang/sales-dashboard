import cohere
from .config import settings

co = cohere.Client(settings.COHERE_API_KEY)
