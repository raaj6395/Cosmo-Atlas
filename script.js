function toggleChat() {
    var chatbotContainer = document.getElementById("chatbot-container");
    chatbotContainer.style.display = (chatbotContainer.style.display === "none" || chatbotContainer.style.display === "") ? "block" : "none";
}

 function sendChatGPTRequest(userInput) {
    const key = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + key,
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "user", "content": userInput}
            ]
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.choices[0].message.content);
        var chatMessages = document.getElementById("chat-messages");
        chatMessages.innerHTML += "<div class='user-message'>" + data.choices[0].message.content;
    })
    .catch(error => {
        console.error('Error sending request to ChatGPT API:', error);
    });
}


function sendMessage() {
    var userInput = document.getElementById("user-input").value;
     sendChatGPTRequest(userInput);
    if (userInput.trim() !== "") {
        var chatMessages = document.getElementById("chat-messages");
        chatMessages.innerHTML += "<div class='user-message'>" + userInput + "</div>";
        // You can add logic here to handle the chatbot's response
        document.getElementById("user-input").value = ""; // Clear the input field
    }
}



