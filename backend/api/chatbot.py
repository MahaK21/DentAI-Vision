'''
chatbot.py
-------------------

This script contains the code to run the OpenAI chatbot model on the input message and return the response.

'''
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, AIMessage
import os

# Set OpenAI API Key
os.environ["OPENAI_API_KEY"] = "api-key-here"

chat_model = ChatOpenAI()

def get_chat_response(message, detections):
    diagnosis = "\n".join([f"Tooth {d['tooth_number']} has {d['name']} with {d['confidence']}% confidence." for d in detections])
    response = chat_model([HumanMessage(content=f"Patient X-ray results:\n{diagnosis}\nUser's question: {message}")])
    return response.content
