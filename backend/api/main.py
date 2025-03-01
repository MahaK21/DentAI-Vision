''''
main.py
-------------------

FastAPI server that connects the model to the frontend.

'''
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from chatbot import get_chat_response
#from inference import run_model
import io
import cv2
import numpy as np

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return({"message": "Hello from da backend!"})


@app.post("/predict")
async def predict():
    return {"response": "received!"}
# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     contents = await file.read()
#     #image = np.array(cv2.imdecode(np.frombuffer(contents, np.uint8), -1))
#     print(file.filename)
#     print("Hello from the backend!")
#     return {"upload": file.filename}
    
#     results = run_model(image)
#     return {"detections": results}

@app.post("/chat")
async def chat():
    #response = get_chat_response(message, detections)
    return {"response": "Cool file!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
