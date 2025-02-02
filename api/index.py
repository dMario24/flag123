from fastapi import FastAPI
from typing import Dict
from flag_morph.extract import extract_nouns

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/hipy")
def hello_fast_api():
    return {"message": "HI PYTHON FastAPI"}

@app.get("/api/py/n/{sentence}")
def get_nouns(sentence: str) -> Dict[str, list[str]]:
    r = extract_nouns(sentence)
    return {"nouns": r}

