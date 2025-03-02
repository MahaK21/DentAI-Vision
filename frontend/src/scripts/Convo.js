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

        let data = await response.json();
        console.log("Detection Results:", data);

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
        return "An error occurred. Please try again.";
    }
}
