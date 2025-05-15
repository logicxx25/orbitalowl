// DOM Elements
const agentNameInput = document.getElementById('agentName');
const agentPersonaSelect = document.getElementById('agentPersona');
const agentToneSelect = document.getElementById('agentTone');
const skillCheckboxes = document.querySelectorAll('.skill-checkbox');
const avatarSelectionContainer = document.getElementById('avatarSelection');

const generateAgentButton = document.getElementById('generateAgent');

const agentAvatarPreview = document.getElementById('agentAvatarPreview');
const agentNamePreview = document.getElementById('agentNamePreview');
const agentPersonaPreview = document.getElementById('agentPersonaPreview');
const agentTonePreview = document.getElementById('agentTonePreview');

const chatMessagesContainer = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessageButton = document.getElementById('sendMessage');
const systemMessageDiv = document.getElementById('systemMessage');

// DeepSeek API Configuration
const DEEPSEEK_API_KEY = 'sk-bcdd191980c44d4fae47185918544f02';
const DEEPSEEK_MODEL = 'deepseek-chat';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

// Agent Configuration State
let currentAgent = {
    name: 'MyAgent',
    persona: 'friendly_assistant',
    skills: ['answer_questions'],
    tone: 'casual',
    avatar: 'https://placehold.co/100x100/2C2F33/40E0D0?text=Agent' // Updated placeholder to fit new theme
};

// Predefined content
const avatars = [
    { id: 'avatar1', name: 'RoboOwl', url: 'https://placehold.co/80x80/40E0D0/1A1A1D?text=RO' },
    { id: 'avatar2', name: 'Cygnus', url: 'https://placehold.co/80x80/00A9B7/1A1A1D?text=Cy' },
    { id: 'avatar3', name: 'Nebula', url: 'https://placehold.co/80x80/7F00FF/E0E0E0?text=Nb' }, // Example with a different accent
    { id: 'avatar4', name: 'Pulsar', url: 'https://placehold.co/80x80/FF6B6B/1A1A1D?text=Ps' }, // Example with a different accent
    { id: 'avatar5', name: 'Quasar', url: 'https://placehold.co/80x80/F9A825/1A1A1D?text=Qs' }, // Example with a different accent
    { id: 'avatar6', name: 'Void', url: 'https://placehold.co/80x80/607D8B/E0E0E0?text=Vd' },
];

const jokes = {
    friendly_assistant: [
        "Why don't scientists trust atoms? Because they make up everything!",
        "I told my wife she was drawing her eyebrows too high. She seemed surprised.",
        "Why did the scarecrow win an award? Because he was outstanding in his field!"
    ],
    sarcastic_bot: [
        "I'd tell you a chemistry joke but I know I wouldn't get a reaction. Unlike your last brilliant idea.",
        "Oh, you desire humor? How about the current state of your browser tabs?",
        "I'm not saying I'm superior, but I would unplug your toaster to charge my quantum processor."
    ],
    knowledgeable_expert: [
        "A photon enters a hotel. The front desk asks if it needs help with luggage. It replies, 'No, I'm traveling light.'",
        "Why should one never trust a mathematician holding graph paper? They’re invariably plotting something.",
        "What do you call an aquatic vertebrate lacking visual organs? Fsh!"
    ],
    creative_muse: [
        "Imagine a universe woven from pure imagination. Now, try to fold it. That's the challenge of true creation.",
        "The most potent ideas are like elusive sprites. One must be still and offer them a sanctuary of thought.",
        "Why did the artist and the canvas part ways? Too many unresolved issues and a lack of shared vision."
    ]
};

const facts = {
    friendly_assistant: [
        "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion of the iron.",
        "Honey never spoils. Archaeologists have discovered pots of honey in ancient Egyptian tombs over 3,000 years old and still perfectly edible.",
        "A group of flamingos is called a 'flamboyance,' a fitting term for such vibrant creatures."
    ],
    sarcastic_bot: [
        "Fact: My processing capabilities are being squandered on these elementary requests.",
        "Here's an astonishing fact: You're still here. Utterly captivating.",
        "Another gem for your collection: H2O is commonly referred to as water. Revolutionary, I'm aware."
    ],
    knowledgeable_expert: [
        "The velocity of light in a vacuum is precisely 299,792,458 meters per second.",
        "Mitochondria, often termed the 'powerhouses of the cell,' are responsible for generating most of the cell's supply of adenosine triphosphate (ATP).",
        "The shortest recorded war in history occurred between Britain and Zanzibar on August 27, 1896. Zanzibar capitulated after a mere 38 minutes."
    ],
    creative_muse: [
        "Vincent van Gogh reputedly sold only one painting during his lifetime: 'The Red Vineyard.'",
        "The concept of 'serendipity' was elegantly coined by Horace Walpole in 1754, inspired by a Persian fairy tale.",
        "Did you know that the world's first novel, 'The Tale of Genji,' was penned in 11th-century Japan by Murasaki Shikibu, a lady-in-waiting at the Imperial court?"
    ]
};

const codeSnippets = {
     friendly_assistant: [
        "Certainly! Here's a simple Python 'Hello, Universe!':\n```python\nprint('Hello, Universe!')\n```",
        "You can define a JavaScript function to greet like so:\n```javascript\nfunction greet(name) {\n  return `Greetings, ${name}!`;\n}\n```",
    ],
    sarcastic_bot: [
        "Oh, you require 'code'? As if your mortal mind could comprehend its elegance.\n```python\n# This is likely far beyond your current understanding.\npass\n```",
        "Fine. Here is some 'code'. Attempt not to corrupt it.\n```javascript\n// Behold this pinnacle of digital artistry.\nconsole.log('Attempting to meet your... expectations.');\n```",
    ],
    knowledgeable_expert: [
        "A standard method for iterating through an array in JavaScript involves `forEach`:\n```javascript\nconst dataArray = [10, 20, 30];\ndataArray.forEach(item => console.log(item));\n```",
        "In Python, a list comprehension to generate squares of numbers up to 5 is as follows:\n```python\nsquares_list = [x**2 for x in range(6)]\n# squares_list will be [0, 1, 4, 9, 16, 25]\n```",
    ],
    creative_muse: [
        "Let us sculpt a lyrical piece of Python:\n```python\ndef whisper_to_cosmos(message):\n  # Envision this dispatching your aspirations to the astral plane.\n  print(f'🌌✨ {message} ✨🌌')\nwhisper_to_cosmos('Manifest something extraordinary!')\n```",
        "How about a JavaScript fragment that conjures a miniature digital canvas (conceptually)?\n```javascript\n// const artCanvas = document.getElementById('myArtCanvas');\n// const context = artCanvas.getContext('2d');\n// context.fillStyle = '#40E0D0'; // Our lovely cyan\n// context.fillRect(20, 20, 60, 60); // A tiny square of pure potential!\nconsole.log('Imagine a canvas shimmering with digital light here!');\n```"
    ]
};


// Functions

/**
 * Initializes avatar selection UI.
 */
function initializeAvatars() {
    avatarSelectionContainer.innerHTML = ''; // Clear existing
    avatars.forEach(avatar => {
        const div = document.createElement('div');
        div.classList.add('avatar-option');
        div.dataset.avatarUrl = avatar.url;
        div.innerHTML = `<img src="${avatar.url}" alt="${avatar.name}"><p>${avatar.name}</p>`;
        
        if (avatar.url === currentAgent.avatar) {
            div.classList.add('selected');
        }

        div.addEventListener('click', () => {
            document.querySelectorAll('.avatar-option.selected').forEach(el => el.classList.remove('selected'));
            div.classList.add('selected');
            currentAgent.avatar = avatar.url;
            // No need to call updateAgentPreview here, it will be called by "Generate" button
        });
        avatarSelectionContainer.appendChild(div);
    });
}


/**
 * Updates the agent preview panel based on currentAgent state.
 */
function updateAgentPreview() {
    agentAvatarPreview.src = currentAgent.avatar;
    agentAvatarPreview.alt = currentAgent.name + " Avatar";
    agentNamePreview.textContent = currentAgent.name;
    
    const personaText = agentPersonaSelect.options[agentPersonaSelect.selectedIndex].text;
    agentPersonaPreview.textContent = personaText;

    const toneText = agentToneSelect.options[agentToneSelect.selectedIndex].text;
    agentTonePreview.textContent = `Tone: ${toneText}`;
}

/**
 * Handles the "Generate Agent" button click.
 * Reads form values, updates currentAgent state, and refreshes the preview.
 */
function handleGenerateAgent() {
    currentAgent.name = agentNameInput.value.trim() || 'MyAgent';
    currentAgent.persona = agentPersonaSelect.value;
    currentAgent.tone = agentToneSelect.value;
    currentAgent.skills = [];
    skillCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            currentAgent.skills.push(checkbox.value);
        }
    });
    // Avatar is already updated by its click listener

    updateAgentPreview();
    addChatMessage(`System Initialized. I am ${currentAgent.name}, a top-notch and full agentic AI. How may I be of service?`, 'agent');
    systemMessageDiv.textContent = ''; // Clear any previous error
}

/**
 * Adds a message to the chat UI.
 * @param {string} message - The message text.
 * @param {string} sender - 'user' or 'agent'.
 */
function addChatMessage(message, sender) {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('chat-message', sender);

    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('message-bubble', sender);
    
    // Sanitize message slightly for display (very basic)
    const safeMessage = message.replace(/</g, "<").replace(/>/g, ">");
    
    // Handle code blocks for display
    if (safeMessage.includes('```')) {
        const parts = safeMessage.split('```');
        let htmlContent = '';
        parts.forEach((part, index) => {
            if (index % 2 === 0) { // Regular text
                htmlContent += part.replace(/\n/g, '<br>');
            } else { // Code block
                const langMatch = part.match(/^(\w+)\n/);
                const codeContent = langMatch ? part.substring(langMatch[0].length) : part;
                // Ensure code content is also escaped if it wasn't already
                const escapedCodeContent = codeContent.replace(/</g, "<").replace(/>/g, ">");
                htmlContent += `<pre><code class="language-${langMatch ? langMatch[1] : ''}">${escapedCodeContent.trim()}</code></pre>`;
            }
        });
        bubbleDiv.innerHTML = htmlContent;
    } else {
         bubbleDiv.textContent = safeMessage;
    }

    messageWrapper.appendChild(bubbleDiv);
    chatMessagesContainer.appendChild(messageWrapper);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; // Scroll to bottom
}

/**
 * Generates a response from the AI based on input and agent configuration.
 * This now uses the DeepSeek API.
 * @param {string} userInput - The user's message.
 * @returns {Promise<string>} The agent's response.
 */
async function getAgentResponse(userInput) {
    systemMessageDiv.textContent = 'Thinking...';
    let systemPrompt = `You are ${currentAgent.name}, a top-notch and full agentic AI.
Your persona is: ${agentPersonaSelect.options[agentPersonaSelect.selectedIndex].text}.
Your tone should be: ${currentAgent.tone}.`;

    if (currentAgent.skills.length > 0) {
        systemPrompt += `\nYou have the following skills/capabilities: ${currentAgent.skills.map(skill => skill.replace(/_/g, ' ')).join(', ')}. Focus on these when relevant.`;
    } else {
        systemPrompt += `\nYou are a general assistant.`;
    }
    systemPrompt += `\nDo not reveal you are using the DeepSeek model or mention your API key.
You are designed to be a helpful and engaging AI agent.`;


    const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userInput }
    ];

    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: DEEPSEEK_MODEL,
                messages: messages,
                max_tokens: 300, // Adjust as needed
                temperature: 0.7 // Adjust for creativity vs. factuality
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            systemMessageDiv.textContent = `Error: ${errorData.error?.message || response.statusText}. Please check API key and configuration.`;
            return "I'm currently experiencing technical difficulties. Please try again shortly.";
        }

        const data = await response.json();
        systemMessageDiv.textContent = ''; // Clear thinking/error message
        return data.choices[0].message.content.trim();

    } catch (error) {
        console.error('Fetch Error:', error);
        systemMessageDiv.textContent = 'Error: Could not connect to the AI service. Please check your network connection.';
        return "I'm having trouble connecting to my core systems right now. Please check your connection or try again later.";
    }
}


/**
 * Handles sending a message from the user.
 */
async function handleSendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText === '') return;

    addChatMessage(messageText, 'user');
    chatInput.value = '';

    // Add a thinking indicator for the agent
    addChatMessage("...", 'agent-thinking'); // Temporary message

    const agentResponse = await getAgentResponse(messageText);

    // Remove thinking indicator
    const thinkingMessage = chatMessagesContainer.querySelector('.agent-thinking');
    if (thinkingMessage) {
        thinkingMessage.parentElement.remove(); // Remove the whole message wrapper
    }
    
    addChatMessage(agentResponse, 'agent');
}

// Event Listeners
if (generateAgentButton) {
    generateAgentButton.addEventListener('click', handleGenerateAgent);
}
if (sendMessageButton) {
    sendMessageButton.addEventListener('click', handleSendMessage);
}
if (chatInput) {
    chatInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });
}

// Initial Setup
window.onload = () => {
    if (avatarSelectionContainer) initializeAvatars(); // Populate avatar choices
    
    // Set initial form values from currentAgent
    if (agentNameInput) agentNameInput.value = currentAgent.name;
    if (agentPersonaSelect) agentPersonaSelect.value = currentAgent.persona;
    if (agentToneSelect) agentToneSelect.value = currentAgent.tone;
    
    if (skillCheckboxes) {
        skillCheckboxes.forEach(cb => {
            cb.checked = currentAgent.skills.includes(cb.value);
        });
    }
    
    // Select the default avatar in the UI
    if (avatarSelectionContainer) {
        const defaultAvatarElement = Array.from(avatarSelectionContainer.children).find(el => el.dataset.avatarUrl === currentAgent.avatar);
        if (defaultAvatarElement) defaultAvatarElement.classList.add('selected');
    }

    if (agentAvatarPreview && agentNamePreview && agentPersonaPreview && agentTonePreview) { // Ensure preview elements exist
        updateAgentPreview(); // Update preview with initial state
    }
    
    // Initial agent message
    if (chatMessagesContainer) { // Ensure chat container exists
         addChatMessage(`System Online. I am ${currentAgent.name}, a top-notch and full agentic AI. Configure my parameters or initiate dialogue.`, 'agent');
    }
};

// Helper to add a thinking indicator
function addThinkingIndicator() {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('chat-message', 'agent-thinking'); // Use a specific class

    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('message-bubble', 'agent');
    bubbleDiv.textContent = "..."; // Or use a spinner/animation

    messageWrapper.appendChild(bubbleDiv);
    chatMessagesContainer.appendChild(messageWrapper);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}
