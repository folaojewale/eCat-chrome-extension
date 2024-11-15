// Messages area
const chatboxMessages = document.createElement("div");
chatboxMessages.classList.add("chatbox-messages");

// Input area
const chatboxInput = document.createElement("input");
chatboxInput.classList.add("chatbox-input");
chatboxInput.placeholder = "Type a message...";

// Send button
const chatboxSendBtn = document.createElement("button");
chatboxSendBtn.classList.add("chatbox-send-btn");
chatboxSendBtn.textContent = "Send";



// Messaging functionality
chatboxSendBtn.addEventListener("click", sendMessage);

chatboxInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const userMessage = chatboxInput.value.trim(); // Get the input value and trim whitespace
    if (userMessage) {
        // Create a new message element
        const newMessage = document.createElement("div");
        newMessage.classList.add("message_user");
        newMessage.textContent = userMessage;

        // Append the new message to the chatboxMessages area
        chatboxMessages.appendChild(newMessage);

        // Scroll to the latest message
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;

        // Clear the input field
        chatboxInput.value = "";

        callGoogleAPI(userMessage);
    }
}

function displayAPIMessage(apiMessage) {
    const message_ai = document.createElement("div");
    message_ai.classList.add("message_ai");
    message_ai.textContent = apiMessage;

    // Append the AI message to the chatboxMessages area
    chatboxMessages.appendChild(message_ai);

    // Scroll to the latest message
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}