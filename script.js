// Predefined chapters
const predefinedChapters = [
    { name: "naming a variable", fileName: "naming_a_variable.txt" },
    { name: "operators 1", fileName: "operators_1.txt" },
    { name: "operators 2", fileName: "operators_2.txt" },
    { name: "while loop", fileName: "while_loop.txt" }
];

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
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        const messageLine = messages[currentMessageIndex];
        const [sender, ...messageParts] = messageLine.split('-->');
        const messageText = messageParts.join(' ').trim();

        messageElement.classList.add(sender.trim() === 'student' ? 'right' : 'left');
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
    document.querySelectorAll('#chapters button').forEach(button => {
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
        button.style.border = '2px solid green';
    });

    buttonElement.style.backgroundColor = 'darkgreen';
    buttonElement.style.color = 'white';
    buttonElement.style.border = '2px solid black';

    loadConversation(chapterFile).then(conversation => {
        messages = conversation;
        currentMessageIndex = 0;
        chatBox.innerHTML = '';
        nextMessageButton.style.display = 'block';
        displayNextMessage();
    });
}

// Function to initialize chapters
function initializeChapters() {
    const chapters = JSON.parse(localStorage.getItem('chapters')) || [];

    // Add predefined chapters if not already present
    predefinedChapters.forEach(predefinedChapter => {
        if (!chapters.some(chapter => chapter.name === predefinedChapter.name)) {
            chapters.push(predefinedChapter);
        }
    });

    localStorage.setItem('chapters', JSON.stringify(chapters));
    return chapters;
}

function loadChapters() {
    const chaptersDiv = document.getElementById('chapters');
    const chapters = initializeChapters();

    chapters.forEach(chapter => {
        const button = document.createElement('button');
        button.textContent = chapter.name;
        button.onclick = () => loadChapter(chapter.fileName, button);
        chaptersDiv.appendChild(button);
    });
}

document.getElementById('addChapterButton').addEventListener('click', function() {
    window.location.href = 'add-chapter.html'; // Redirect to add-chapter.html
});

nextMessageButton.addEventListener('click', displayNextMessage);
loadChapters();
