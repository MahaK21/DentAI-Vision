/*
A set of scripts for handling data transfer and conversations with the Chatbot.
 */

export async function startConversation(imageFile, prompt) {
    console.log(`Uploading image...`);

    // Prepare FormData for image upload
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
        // Step 1: Send image to FastAPI's /predict/ endpoint
        let response = await fetch("http://127.0.0.1:8000/predict/", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Error uploading image");
        }

        let data = await response;

        // This is a 'blob' of bytes (stores the file's data)
        const dBlob = await data.blob();
        const url = URL.createObjectURL(dBlob);

		console.log("Chatbot Explanation:", data.explanation);
        console.log("Detections:", data.detections); 

		return {
            image_url: url, // Annotated image
            explanation: data.explanation, // Chatbot's response
            detections: data.detections  // ✅ Store detections for later chatbot conversation
        };

        

        // If we want, we can return just the url (for debugging)... this will get the image working.
       //return url;

        // Step 2: Send detections + user prompt to Chatbot API
        console.log(`Sending results to chatbot...`);
        response = await fetch("http://127.0.0.1:8000/chat/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                detections: data.detections
            })
        });

        if (!response.ok) {
            throw new Error("Error getting chatbot response");
        }

        let chatData = await response.json();
        console.log("Chatbot Response:", chatData.response);

		{ /* */ }
        return chatData.response;

    } catch (error) {
        
        console.error("Error in startConversation:", error);
        return {"error": "Could not connect to the chatbot. Please try again later."};
    }
}
export async function chatWithChatbot(message, previousDetections) {
    console.log(`User: ${message}`);

    try {
        let response = await fetch("http://127.0.0.1:8000/chat/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message, // User's message
                detections: previousDetections // Previous YOLOv5 results
            })
        });

        if (!response.ok) {
            throw new Error("Error getting chatbot response");
        }
		
		console.log('Now the chatbot is talking')
        let chatData = await response.json();
        //console.log("Chatbot Response:", chatData.response);
		

        return chatData.response;
    } catch (error) {
        console.error("Error in chatWithChatbot:", error);
        return  "Could not connect to the chatbot. Please try again later." ;
    }
}


