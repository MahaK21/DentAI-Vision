''''
main.py
-------------------

FastAPI server that connects the model to the frontend.

'''
from fastapi import FastAPI, UploadFile, File, Response
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import base64

from inference import run_model
import io
import cv2
import numpy as np
from starlette.requests import Request

import tempfile

# Importing issue here
from chatbot.deep_chatbot import Chatbot


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

# Create deepseek chatbot
chatbot = Chatbot()
print("DeepSeek chatbot is up and running!")

class ChatData(BaseModel):
    message: str
    detections: object

@app.get("/")
async def root():
    return({"message": "Hello from da backend!"})

@app.post("/predict/")
async def predict(request: Request, file: UploadFile = File(...)):
   # async def predict(file: UploadFile = File(...)):

    print(f"received file: {file.filename}")

    contents = await file.read()
    image = np.array(cv2.imdecode(np.frombuffer(contents, np.uint8), -1))
    print(len(image))

    print("running da model")
    #processed_img = run_model(image)
    processed_img, detections = run_model(image)

    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".jpg")
    print(temp);
    cv2.imwrite(temp.name, processed_img);

    #cv2.imwrite("../images/result.jpg", processed_img);
    
    _, buffer = cv2.imencode(".jpg", processed_img);
    image_base64 = base64.b64encode(buffer).decode("utf-8")

    # return {
    #     "image": Response(content=buffer.tobytes(), media_type="image/jpeg"),
    #     "detections": detections  # Include the detected objects
    # }

    return JSONResponse(content={"image": image_base64, "detections": detections})

    return Response(content=buffer.tobytes(), media_type="image/jpeg");

    return FileResponse(temp.name, media_type="image/jpeg");
   # return {"detections": results}

@app.post("/chat")
async def chat(body: ChatData):

    print(f"message: {body.message}")
    print(f"detections: {body.detections}")

    if body.detections:
        detection_summary = "I analyzed your X-ray and found the following:\n"
        for det in body.detections:
            detection_summary += f"- {det['label']} detected with {det['confidence']*100:.1f}% confidence.\n"

        response_text = chatbot.respond(detection_summary + "\n\n" + body.message)
    else:
        response_text = chatbot.respond(body.message)

    return {"response": response_text}
    
    return {"response": chatbot.respond(body.message)}
    
    # Placeholder msg: return {"response": "Hello from the chatbot!"};
    return "hi";
    return response;

if __name__ == "__main__":
    import uvicorn

    # Note: server is starting twice because we have default code (see top of this file)
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
