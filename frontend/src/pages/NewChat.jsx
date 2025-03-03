import "./NewChat.css"

import Navbar from "../Navbar"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"


const NewChat = () => {

	const [file, setFile] = useState(null)
	const [prompt, setPrompt] = useState("")

	const navigate = useNavigate();

	const inputField = useRef(null);

	const handleClick = (event) => {
		inputField.current.click();
	}

	function startNewChat(file, prompt) {
		navigate("/chat", {state: {image: file, text: prompt, time: Date.now()}});
	}
  
  function getStatusMsg() {
    if (file) {
      return "Uploaded: " + file.name;
    }

    return "Upload an X-Ray photo to get started."
  }

  return (
    <div className="app-container">
      <Navbar/>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-heading">Start a New Chat</h1>

        {/* Upload Button */}
        <button className="upload-button" onClick={handleClick}>
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
		<input type="file" ref={inputField} onChange={e => setFile(e.target.files[0])} style={{display: "none"}}></input>

        <p className="helper-text">{getStatusMsg()}</p>

        {/* Chat Input */}
        <div className="chat-input-container">
          <input type="text" placeholder="How can I help you today?"
		  		value={prompt} 
		  		onInput={e => setPrompt(e.target.value)}
				className="chat-input"
			/>

		  { /* When we click this, we need to get the data from the text field and the image */}
          <button className="send-button" onClick={() => startNewChat(file, prompt)}>Send</button>
        </div>
      </main>
    </div>
  )
}

export default NewChat

