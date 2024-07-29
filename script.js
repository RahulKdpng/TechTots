// Function to load conversation from a text file
async function loadConversation() {
    try {
        // Fetch the text file
        const response = await fetch('data/conversation.txt');
        if (!response.ok) throw new Error('Network response was not ok');
        
        // Get the text content of the file
        const text = await response.text();
        
        // Split the text into messages based on new lines and arrows
        return text.split('\n').map(line => line.trim()).filter(line => line);
    } catch (error) {
        console.error('Error loading the conversation:', error);
        return [];
    }
}

// Initialize the conversation
let messages = [];
let currentMessageIndex = 0;

// Get the chat box and button elements
const chatBox = document.getElementById('chatBox');
const pressImageButton = document.getElementById('pressImageButton');

// Function to display the next message
function displayNextMessage() {
    if (currentMessageIndex < messages.length) {
        // Create a new div element for the message
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        // Add alternating class
        const messageLine = messages[currentMessageIndex];
        const [sender, ...messageParts] = messageLine.split('-->');
        const messageText = messageParts.join(' ').trim();

        messageElement.classList.add(sender.trim() === 'student' ? 'right' : 'left');

        // Set the message text
        messageElement.textContent = messageText;

        // Append the message to the chat box
        chatBox.appendChild(messageElement);

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;

        // Increment the message index
        currentMessageIndex++;
    } else {
        // Optionally, handle the case when all messages have been displayed
        pressImageButton.style.display = 'none'; // Hide the button or provide a different message
    }
}

// Add event listener to the button
pressImageButton.addEventListener('click', displayNextMessage);

// Load the conversation and set up initial state
loadConversation().then(conversation => {
    messages = conversation;
    displayNextMessage(); // Display the first message immediately if desired
});
