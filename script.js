// script.js

// Define the chapters to be added
const predefinedChapters = [
    { name: "6. Data Type", fileName: "data_type.txt" },
    { name: "7. Naming a Variable", fileName: "naming_a_variable.txt" },
    { name: "8. Operators 1", fileName: "operators_1.txt" },
    { name: "9. Operators 2", fileName: "operators_2.txt" },
    { name: "10. String 1", fileName: "string_1.txt" },
    { name: "11. String 2", fileName: "string_2.txt" },
    { name: "24. While Loop", fileName: "while_loop.txt" }
];

// Function to initialize chapters
function initializeChapters() {
    return predefinedChapters;
}

function loadChapters() {
    const chaptersDiv = document.getElementById('chapters');
    chaptersDiv.innerHTML = ''; // Clear any existing chapter buttons
    const chapters = initializeChapters();

    chapters.forEach(chapter => {
        const button = document.createElement('button');
        button.textContent = chapter.name;
        button.onclick = () => loadChapter(chapter.fileName, button);
        chaptersDiv.appendChild(button);
    });
}

// Function to load conversation from a text file
async function loadConversation(fileName) {
    try {
        const response = await fetch(`data/${fileName}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        return text.split('\n').map(line => line.trim()).filter(line => line);
    } catch (error) {
        console.error('Error loading the conversation:', error);
        return [];
    }
}

let messages = [];
let currentMessageIndex = 0;

const chatBox = document.getElementById('chatBox');
const nextMessageButton = document.getElementById('nextMessageButton');

// Function to display the next message
function displayNextMessage() {
    if (currentMessageIndex < messages.length) {
        const messageLine = messages[currentMessageIndex];
        const [sender, ...messageParts] = messageLine.split('-->');
        const messageText = messageParts.join(' ').trim();
        const senderClass = sender.trim() === 'student' ? 'right' : 'left';

        const messageElement = document.createElement('div');
        messageElement.classList.add('message', senderClass);
        messageElement.textContent = messageText;

        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
        currentMessageIndex++;
    } else {
        nextMessageButton.style.display = 'none';
    }
}

// Function to load a chapter and initialize the conversation
function loadChapter(chapterFile, buttonElement) {
    // Style the clicked button
    document.querySelectorAll('#chapters button').forEach(button => {
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
        button.style.border = '2px solid green';
    });

    buttonElement.style.backgroundColor = 'darkgreen';
    buttonElement.style.color = 'white';
    buttonElement.style.border = '2px solid black';

    // Load the conversation
    loadConversation(chapterFile).then(conversation => {
        messages = conversation;
        currentMessageIndex = 0;
        chatBox.innerHTML = '';
        nextMessageButton.style.display = 'block';
        displayNextMessage();
    });
}

// Initialize chapters on page load
loadChapters();
nextMessageButton.addEventListener('click', displayNextMessage);
