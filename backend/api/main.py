''''
main.py
-------------------

FastAPI server that connects the model to the frontend.

'''
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from chatbot import get_chat_response
from inference import run_model
import io
import cv2
import numpy as np
from starlette.requests import Request


from pydantic import BaseModel
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatData(BaseModel):
    message: str
    detections: object

@app.get("/")
async def root():
    return({"message": "Hello from da backend!"})

@app.post("/predict/")
async def predict(request: Request, file: UploadFile = File(...)):
   # async def predict(file: UploadFile = File(...)):

    print(f"Headers: {request.headers}")

    print("doing something!")
    contents = await file.read()
    image = np.array(cv2.imdecode(np.frombuffer(contents, np.uint8), -1))
    
    results = run_model(image)
    return {"detections": results}

@app.post("/chat")
async def chat(body: ChatData):

    print(f"message: {body.message}")
    print(f"detections: {body.detections}")
    
    #response = get_chat_response(body.message, body.detections)
    return {"response": "Hello from the chatbot!"};
    return response;

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
