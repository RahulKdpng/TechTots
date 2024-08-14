// Define the chapters to be added
// Define the chapters to be added
const predefinedChapters = [
    { name: "6. Data Type", fileName: "data_type.txt" },
    { name: "7. Naming a Variable", fileName: "naming_a_variable.txt" },
    { name: "8. Operators 1", fileName: "operators_1.txt" },
    { name: "9. Operators 2", fileName: "operators_2.txt" },
    { name: "10. String 1", fileName: "string_1.txt" },
    { name: "11. String 2", fileName: "string_2.txt" },    
    { name: "12. Input & embedding 1", fileName: "Input1.txt" }, // New chapter
    { name: "13. Input & embedding 2", fileName: "Input2.txt" }, // New chapter
    { name: "14. String Indexing 1", fileName: "String_Index1.txt" },
    { name: "15. String Indexing 2", fileName: "String_Index2.txt" },
    { name: "16. Find & Replace 1", fileName: "find_&_replace1.txt" },
    { name: "17. Find & Replace 2", fileName: "find_&_replace2.txt" },
    { name: "24. While Loop", fileName: "while_loop.txt" },
    { name: "26. for Loop 1", fileName: "for_loop1.txt" },
    { name: "26. for Loop 2", fileName: "for_loop2.txt" }
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
        button.onclick = () => authenticateUser(chapter);
        chaptersDiv.appendChild(button);
    });
}

// Function to authenticate user
function authenticateUser(chapter) {
    const modal = document.getElementById("authModal");
    const closeButton = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    closeButton.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    document.getElementById("submitAuth").onclick = function() {
        const username = document.getElementById("username").value;
        const authKey = document.getElementById("authKey").value;

        if (username && authKey) {
            verifyCredentials(username, authKey)
                .then(isValid => {
                    if (isValid) {
                        modal.style.display = "none";
                        showChapterOptions(chapter);
                    } else {
                        alert("Invalid username or authentication key.");
                    }
                })
                .catch(error => {
                    console.error("Error verifying credentials:", error);
                    alert("Error verifying credentials. Please try again.");
                });
        } else {
            alert("Username and authentication key are required.");
        }
    };
}

// Simulated function to verify credentials
async function verifyCredentials(username, authKey) {
    // Replace this with actual authentication logic, e.g., API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(username === "rahul" && authKey === "kd");
        }, 1000);
    });
}

// Function to show options for the selected chapter
function showChapterOptions(chapter) {
    const contentDiv = document.getElementById('contentContainer');
    contentDiv.innerHTML = ''; // Clear existing content

    const title = document.createElement('h2');
    title.textContent = chapter.name;
    contentDiv.appendChild(title);

    const options = ['ChatBox', 'Quiz', 'Material'];
    options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        
        const img = document.createElement('img');
        img.src = `res/${option.toLowerCase()}.png`; // Ensure you have the images in the res folder
        img.alt = option;
        optionDiv.appendChild(img);

        const text = document.createElement('span');
        text.textContent = option;
        optionDiv.appendChild(text);

        optionDiv.onclick = () => {
            if (option === 'ChatBox') {
                loadConversation(chapter.fileName).then(conversation => {
                    showChatBox(conversation);
                });
            } else if (option === 'Quiz') {
                showQuiz(chapter.fileName); // Implement this function
            } else if (option === 'Material') {
                showMaterial(chapter.fileName); // Implement this function
            }
        };

        contentDiv.appendChild(optionDiv);
    });
}

// Function to display the chat box
async function showChatBox(conversation) {
    const contentDiv = document.getElementById('contentContainer');
    contentDiv.innerHTML = ''; // Clear existing content

    const chatBox = document.createElement('div');
    chatBox.id = 'chatBox';
    chatBox.style.width = '100%';
    chatBox.style.flex = '1';
    chatBox.style.overflowY = 'auto';
    chatBox.style.display = 'flex';
    chatBox.style.flexDirection = 'column';
    chatBox.style.alignItems = 'flex-start';
    chatBox.style.marginBottom = '10px';
    contentDiv.appendChild(chatBox);

    const nextMessageButton = document.createElement('button');
    nextMessageButton.id = 'nextMessageButton';
    nextMessageButton.textContent = 'Next Message';
    contentDiv.appendChild(nextMessageButton);

    let messages = conversation;
    let currentMessageIndex = 0;
    let currentSender = '';
    let messageContainer = null;

    function displayNextMessage() {
        if (currentMessageIndex < messages.length) {
            const messageLine = messages[currentMessageIndex];
            const [sender, ...messageParts] = messageLine.split('-->');
            const messageText = messageParts.join(' ').trim().replace(/<kd>/g, ' '); // Replace <kd> with space
            const senderClass = (sender.trim() === 'student' || sender.trim() === 'cartoon') ? 'right' : 'left';


            if (sender.trim() !== currentSender) {
                currentSender = sender.trim();
                messageContainer = document.createElement('div');
                messageContainer.classList.add('message-container', senderClass);
                chatBox.appendChild(messageContainer);
            }

            if (sender.trim() === 'cartoon') {
                let imageName = '';
                switch (messageText) {
                    case 'naughty_m':
                        imageName = 'cartoon/naughty_m.png';
                        break;
                    case 'claim_m':
                        imageName = 'cartoon/claim_m.png';
                        break;
                    case 'gotit_m':
                        imageName = 'cartoon/gotit_m.png';
                        break;
                    case 'understanding_m':
                        imageName = 'cartoon/understanding_m.png';
                        break;
                    case 'love_m':
                        imageName = 'cartoon/love_m.png';
                        break;
                    case 'funny_m':
                        imageName = 'cartoon/funny_m.png';
                        break;
                    case 'fear_m':
                        imageName = 'cartoon/fear_m.png';
                        break;
                    case 'ahh_m':
                        imageName = 'cartoon/ahh_m.png';
                        break;
                    case 'naughty_f':
                        imageName = 'cartoon/naughty_f.png';
                        break;
                    case 'claim_f':
                        imageName = 'cartoon/claim_f.png';
                        break;
                    case 'happy_f':
                        imageName = 'cartoon/happy_f.png';
                        break;
                    case 'understanding_f':
                        imageName = 'cartoon/understanding_f.png';
                        break;
                    case 'dout_f':
                        imageName = 'cartoon/dout_f.png';
                        break;
                    case 'funny_f':
                        imageName = 'cartoon/funny_f.png';
                        break;
                    case 'enjy_f':
                        imageName = 'cartoon/enjy_f.png';
                        break;
                    case 'fear_f':
                        imageName = 'cartoon/fear_f.png';
                        break;

                    default:
                        imageName = '';
                        break;
                }

                if (imageName) {
                    const imgElement = document.createElement('img');
                    imgElement.src = `res/${imageName}`;
                    imgElement.alt = messageText;
                    imgElement.classList.add('message');
                    messageContainer.appendChild(imgElement);
                } else {
                    const messageElement = document.createElement('pre'); // Use <pre> for preformatted text
                    messageElement.classList.add('message');
                    messageElement.textContent = messageText;
                    messageContainer.appendChild(messageElement);
                }
            } else {
                const messageElement = document.createElement('pre'); // Use <pre> for preformatted text
                messageElement.classList.add('message');
                messageElement.textContent = messageText;
                messageContainer.appendChild(messageElement);
            }

            chatBox.scrollTop = chatBox.scrollHeight;
            currentMessageIndex++;
        } else {
            nextMessageButton.style.display = 'none';
        }
    }

    nextMessageButton.addEventListener('click', displayNextMessage);
    displayNextMessage();
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

// Function to show quiz (to be implemented)
function showQuiz(fileName) {
    // Implement quiz functionality here
}

// Function to show material (to be implemented)
function showMaterial(fileName) {
    // Implement material functionality here
}

// Initialize chapters on page load
loadChapters();
