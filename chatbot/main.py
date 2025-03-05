# to run this you need : 
# pip install langchain requests

import os
import requests
from typing import Optional, List
from langchain.memory import ConversationBufferMemory
from langchain.schema import SystemMessage
from langchain.docstore.document import Document

def load_dental_documents(directory: str) -> List[Document]:
    # load txt files from folder and extract source, title, and content
    documents = []
    for filename in os.listdir(directory):
        if filename.endswith(".txt"):
            filepath = os.path.join(directory, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read().strip()
            lines = content.splitlines()
            if len(lines) < 3:
                continue
            source = lines[0][len("Source:"):].strip() if lines[0].startswith("Source:") else "unknown source"
            title = lines[1][len("Title:"):].strip() if lines[1].startswith("Title:") else "untitled"
            try:
                blank_index = lines.index("")
                main_content = "\n".join(lines[blank_index+1:]).strip()
            except ValueError:
                main_content = "\n".join(lines[2:]).strip()
            doc = Document(page_content=main_content, metadata={"source": source, "title": title, "filename": filename})
            documents.append(doc)
    return documents


# MODIFY AND ADD PATH TO FOLDER CONTAINING TEXT FILE - Memory
dental_documents = load_dental_documents(r"chatbot/dental_mem")





def simple_retriever(query: str, documents: List[Document], top_k: int = 3) -> List[Document]:
    # rank documents based on keyword matches in title and content, skip if title has no match
    query_lower = query.lower()
    ranked = []
    for doc in documents:
        content_score = sum(1 for word in query_lower.split() if word in doc.page_content.lower())
        title = doc.metadata.get("title", "").lower()
        title_score = sum(1 for word in query_lower.split() if word in title)
        if title_score == 0:
            continue
        total_score = content_score + (2 * title_score)
        ranked.append((total_score, doc))
    ranked = sorted(ranked, key=lambda x: x[0], reverse=True)
    return [doc for score, doc in ranked if score > 0][:top_k]

class DeepSeekChat:
    # custom deepseek chat api wrapper
    def __init__(self, api_key: str, base_url: str = "https://api.deepseek.com"):
        self.api_key = api_key
        self.base_url = base_url

    def __call__(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        messages = [
            {"role": "system", "content": "you are dentai, a helpful dental health assistant."},
            {"role": "user", "content": prompt}
        ]
        endpoint = f"{self.base_url}/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        data = {"model": "deepseek-chat", "messages": messages, "stream": False}
        response = requests.post(endpoint, json=data, headers=headers)
        if response.status_code != 200:
            raise Exception(f"deepseek api error: {response.status_code}, {response.text}")
        result = response.json()
        return result["choices"][0]["message"]["content"]

class SimpleDeepSeekConversationChain:
    # conversation chain that uses deepseek and document retrieval
    def __init__(self, llm: DeepSeekChat, memory: ConversationBufferMemory, documents: List[Document]):
        self.llm = llm
        self.memory = memory
        self.documents = documents

    def predict(self, input_text: str) -> str:
        docs = simple_retriever(input_text, self.documents, top_k=3)
        context_text = "\n".join([doc.page_content for doc in docs])
        references = "\n".join([f"- {doc.metadata.get('source', 'unknown')} (title: {doc.metadata.get('title', 'untitled')})" for doc in docs])
        history_text = "\n".join([msg.content for msg in self.memory.chat_memory.messages])
        custom_prompt = (
            "you are dentai, a dental health assistant. answer the user's question simply and concisely using the provided dental information when relevant. "
            "include references only if the retrieved context is used in your answer.\n\n"
            "conversation history:\n"
            f"{history_text}\n\n"
            "dental context:\n"
            f"{context_text}\n\n"
            "user: {input}\nassistant:"
        )
        prompt = custom_prompt.format(input=input_text)
        response = self.llm(prompt)
        self.memory.chat_memory.add_message(SystemMessage(content="user: " + input_text))
        self.memory.chat_memory.add_message(SystemMessage(content="assistant: " + response))
        if context_text.strip() and references.strip():
            final_response = response.strip() + "\n\nreferences:\n" + references
        else:
            final_response = response.strip()
        return final_response

DEEPSEEK_API_KEY = "sk-76ca8a646b09496aadcc04c0a387136b"
deepseek_llm = DeepSeekChat(api_key=DEEPSEEK_API_KEY)

memory = ConversationBufferMemory(memory_key="history", return_messages=True)
memory.chat_memory.add_message(SystemMessage(content="hi, i'm dentai – your dental health assistant. how can i help you today?"))

conversation = SimpleDeepSeekConversationChain(llm=deepseek_llm, memory=memory, documents=dental_documents)

print("dentai chatbot (deepseek with local dental documents). type 'quit' to exit.")
while True:
    user_input = input("you: ")
    if user_input.lower() == "quit":
        break
    answer = conversation.predict(input_text=user_input)
    print("chatbot:", answer)
