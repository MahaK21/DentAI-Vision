import React, { useState } from "react";

function ChatbotComponent() {
    const [userInput, setUserInput] = useState("");
    const [chatResponse, setChatResponse] = useState("");

    const handleSendMessage = async () => {
        const response = await fetch("http://127.0.0.1:8000/chat/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();
        setChatResponse(data.response);
    };

    return (
        <div>
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>
            <p>{chatResponse}</p>
        </div>
    );
}

export default ChatbotComponent;
