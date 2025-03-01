import "./NewChat.css"

import Navbar from "../Navbar"

import { startConversation } from "../scripts/Convo"

const NewChat = () => {
  return (
    <div className="app-container">
      <Navbar/>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-heading">Start a New Chat</h1>

        {/* Upload Button */}
        <button className="upload-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="camera-icon"
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
            <circle cx="12" cy="13" r="3"></circle>
          </svg>
          <span>Upload X-Ray</span>
        </button>

        <p className="helper-text">Upload an X-Ray photo to get started.</p>

        {/* Chat Input */}
        <div className="chat-input-container">
          <input type="text" placeholder="How can I help you today?" className="chat-input" />

		  { /* When we click this, we need to get the data from the text field and the image */}
          <button className="send-button" onClick={handleSubmit}>Send</button>
        </div>
      </main>
    </div>
  )
}

function handleSubmit() {
	startConversation()
}

export default NewChat

