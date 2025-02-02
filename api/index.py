from fastapi import FastAPI
from typing import Dict
from flag_morph.extract import extract_nouns
from kiwipiepy import Kiwi

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/hipy")
def hello_fast_api():
    return {"message": "HI PYTHON FastAPI"}

@app.get("/api/py/n/{sentence}")
def get_nouns(sentence: str) -> Dict[str, list[str]]:
    r = extract_nouns(sentence)
    return {"nouns": r}

kiwi = Kiwi()
kiwi.analyze("테스트")  # 강제로 모델 로드

def extract_nouns(sentence: str, is_print: bool = False) -> list:
    """
    주어진 문장에서 명사(NNG, NNP, NP)만 추출하여 리스트로 반환합니다.
    """
    result = kiwi.analyze(sentence)
    tokens = result[0][0]

    target_pos = {"NNG", "NNP", "NP"}
    extracted = [word for word, pos, _, _ in tokens if pos in target_pos]
    
    if is_print:
        print(f"Extracted nouns: {extracted}")
    
    return extracted

@app.get("/api/py/kiwi/{sentence}")
def run_kiwi(sentence: str) -> Dict[str, list[str]]:
    r = extract_nouns(sentence)
    return {"nouns": r}

