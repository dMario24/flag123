from fastapi import FastAPI
from datetime import datetime, date
from typing import Dict
import random
from flag_morph.extract import extract_nouns

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/hipy")
def hello_fast_api():
    return {"message": "HI PYTHON FastAPI"}

