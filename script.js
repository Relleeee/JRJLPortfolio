// toggle navbar (resposive)
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x-circle')
    navbar.classList.toggle('active')
};
// Navbar
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    // Sticky Navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when the navbar is clicked
    menuIcon.classList.remove('bx-x-circle')
    navbar.classList.remove('active')
};

// Scroll 
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .projects-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Typed JS

const typed = new Typed('.multiple-text', {
    strings: ['A Software Engineering Student | Full-Stack Developer | UX & UI Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Chatbot functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Function to toggle chatbot visibility and icon
function toggleChatbot() {
    chatbotContainer.classList.toggle('chatbot-hidden');
    chatbotToggle.style.display = chatbotContainer.classList.contains('chatbot-hidden') ? 'block' : 'none';
}

// Event listeners for toggling chatbot
chatbotToggle.addEventListener('click', toggleChatbot);
chatbotClose.addEventListener('click', toggleChatbot);

// Function to add a message to the chatbot
function addMessage(message, isUser) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Function to generate a bot reply
function botReply(userMessage) {
    const lowercaseMessage = userMessage.toLowerCase();

    function includesAny(...keywords) {
        return keywords.some(keyword => lowercaseMessage.includes(keyword));
    }

    switch (true) {
        case includesAny('hello', 'hi'):
            return "Hello! How can I assist you with Joshua's portfolio?";
        case includesAny('skills'):
            return "Joshua has skills in web development, including HTML, CSS, JavaScript, and various frameworks.";
        case includesAny('projects'):
            return "Joshua has worked on several projects, including ABC Learning Center, ABC Job Portal, and Meals On Wheels.";
        case includesAny('education'):
            return "Joshua is currently at his 3rd year in Lithan Academy";
        case includesAny('contact'):
            return "You can reach Joshua at joshualiao1211@gmail.com or via phone number +639498245847.";
        case includesAny('email'):
            return "You can reach Joshua at joshualiao1211@gmail.com.";
        case includesAny('phone, phone numebr, number, num'):
            return "You can reach Joshua via phone number +639498245847.";
        case includesAny('resume'):
            return "You can download Joshua's resume here: https://bit.ly/3CoEh0H";
        case includesAny('career', 'work'):
            return "Joshua is currently a software engineer intern at HorecaBid.";
        case includesAny('location', 'located', 'residing'):
            return "Joshua is currently located in Quezon City, Manila Philippines";
        case includesAny('work experience'):
            return "Joshua has worked as a software engineer intern at Smmile Digital, Chimes Consulting, Canary Intelligence and Analytics, and currently at HorecaBid for almost 3 months now!";
        case includesAny('single', 'taken', 'married', 'marital status'):
            return "He has a girlfriend! ^-^";
        case includesAny('color'):
            return "Joshua's favorite color is red";
        default:
            return "I'm sorry, I don't have specific information about that. Is there anything else I can help you with regarding Joshua's portfolio?";
    }
}

// Function to send a message
function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        setTimeout(() => {
            const reply = botReply(message);
            addMessage(reply, false);
        }, 500);
    }
}

// Event listeners for sending messages
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});