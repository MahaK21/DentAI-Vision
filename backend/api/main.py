''''
main.py
-------------------

FastAPI server that connects the model to the frontend.

'''
from fastapi import FastAPI, UploadFile, File
from chatbot import get_chat_response
from inference import run_model
import io
import cv2
import numpy as np

app = FastAPI()

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = np.array(cv2.imdecode(np.frombuffer(contents, np.uint8), -1))
    
    results = run_model(image)
    return {"detections": results}

@app.post("/chat/")
async def chat(message: str, detections: list):
    response = get_chat_response(message, detections)
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
