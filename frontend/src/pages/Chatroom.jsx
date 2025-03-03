//"use client" <- not sure why this line is here

import { useState } from "react"
import { useLocation } from "react-router-dom"
import "./Chatroom.css"

import { startConversation } from "../scripts/Convo"

import Navbar from "../Navbar"

const TODAY = Date.now()

class ChatMessage {
  
  constructor(id, text, sender, time) {
    this.id = id;
    this.text = text;
    this.sender = sender;
    this.time = formatTime(time); // we could store this as a numeric time value, then format later, or as a str (e.g. "Today @ 5:08PM")
  }

  addImage(image) {
    this.image = image;
  }
}

/**
 * Formats the time to something like "Today @ 5:17PM" or "Wednesday @ 2:03 AM"
 * TODO: Find a solution for this. Are we going too deep into the weeds?
 */

function formatTime(timeMs) {

  const date = new Date(timeMs);
  return date.toLocaleTimeString("en-CA");
}



export default function Chatroom() {

  // state of object (so we can get the data from NewChat)
  const {state} = useLocation();
  
  // Construct the first message from new-chat
  const firstMessage = new ChatMessage(0, state.text, "user", state.time);
  if (state.image){
    firstMessage.addImage(state.image);
  }

  // Array of messages for AI and user convo
  const [messages] = useState( [firstMessage, {"type": "waiting"}] )

  const [inputValue, setInputValue] = useState("")

  // Contacts the chatbot with the first message (on load)

  const resp = startConversation(state.file, state.text);



  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    
    // Upload the message to the UI
    let index = messages.length;
    const msg = new ChatMessage(index, inputValue, "user", Date.now());

    messages[index] = msg;

    // TODO: Send chatbot message to backend.

    setInputValue("")
    console.log(state);
  }

  function buildMessage(message) {
    if (message.type == "waiting"){
      // TODO: Add special waiting bubble (with animation?)
      return <h1>Waiting...</h1>
    }
    else {
      return (
        <div
              key={message.id}
              className={`message-wrapper ${message.sender === "user" ? "user-message" : "ai-message"}`}
            >
              <div className="message-bubble">
                { message.image && (
                  <img src={URL.createObjectURL(message.image)}></img>
                )}
                <p className="message-text">{message.text}</p>
                <p className="message-timestamp">{message.time}</p>
              </div>
            </div>
      )
    }
  }

  return (

    <div>
      <Navbar/>
      <div className="chat-container">
        <h1 className="chat-title">Your X-Ray Review</h1>

        <div className="messages-container">
          {messages.map((message) => (
            buildMessage(message)
          ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What can I help you with today?"
          className="message-input"
          rows={1}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
    </div>
  )
}

