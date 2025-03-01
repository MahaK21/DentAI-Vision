"use client"

import { useState } from "react"
import "./Chatroom.css"

import Navbar from "../Navbar"

export default function DentalChat() {
  const [messages] = useState([
    {
      id: 1,
      text: "Hi DentAI! I uploaded my XRay image. My dentist thinks I have a cavity. Can you confirm this?",
      sender: "user",
      timestamp: "Today at 3:27PM",
    },
    {
      id: 2,
      text: "Hi there! I'm not seeing any cavities, but It looks like you have a periapical lesion in the upper-right corner of your mouth. Our model is 87% sure of this. Would you like to learn more?",
      sender: "ai",
      timestamp: "Today at 3:28PM",
    },
    {
      id: 3,
      text: "Okay, that sounds reasonable. I have a lot of pain in that part of my mouth. Why are you only 87% sure?",
      sender: "user",
      timestamp: "Today at 3:30PM",
    },
  ])

  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    // Handle message submission here
    setInputValue("")
  }

  return (

    <div>
      <Navbar/>
      <div className="chat-container">
        <h1 className="chat-title">Your X-Ray Review</h1>

        <div className="messages-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-wrapper ${message.sender === "user" ? "user-message" : "ai-message"}`}
            >
              <div className="message-bubble">
                <p className="message-text">{message.text}</p>
                <p className="message-timestamp">{message.timestamp}</p>
              </div>
            </div>
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

