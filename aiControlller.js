// Function to call the Google Gemini API
async function callGoogleAPI(userMessage) {
    const data = {
        contents: [
            {
                parts: [
                    { text: userMessage } // Use the user's message dynamically
                ]
            }
        ]
    };

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyANaA1E69H7Jo-SDjlNprz1EnSFn2Jd-_0`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization header not typically needed for API key auth unless specified otherwise
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log(responseData.candidates[0].content.parts[0].text)
        // Extract AI's reply from the API response, assuming it’s in `responseData.reply` (adjust if needed)
        const apiReply = responseData.candidates[0].content.parts[0].text; // Adjust based on actual API response structure
        displayAPIMessage(apiReply);
    } catch (error) {
        console.error("Error:", error);
        displayAPIMessage("Sorry, something went wrong.");
    }
}

// Function to call the Google Translate API
async function callGoogleTranslateAPI(text, targetLanguage) {
    const data = {
        q: text,
        target: targetLanguage 
    };
    
    try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyANaA1E69H7Jo-SDjlNprz1EnSFn2Jd-_0`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.data && responseData.data.translations && responseData.data.translations.length > 0) {
            return responseData.data.translations[0].translatedText;
             
        } else {
            console.error("Unexpected API response structure");
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
