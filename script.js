// 1. Custom Message Modal Function (Called by inline HTML onclick)
function showMessage(message) {
    const modal = document.getElementById('custom-modal');
    const modalMessage = document.getElementById('modal-message');

    modalMessage.textContent = message;
    modal.classList.remove('hidden');
    modal.classList.add('flex'); // Use flex to center it
}

// Ensure the function is globally accessible as it's used in inline HTML onclick
window.showMessage = showMessage;


// 2. Typing Animation Effect for Home Section

const typingWords = ["Full-Stack Enthusiast", "Problem Solver", "Software Developer", "Future Engineer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 150; // Typing speed (ms)
const deleteSpeed = 100; // Deleting speed (ms)
const delay = 1500; // Delay before next word

const animatedTextElement = document.querySelector(".animated-text");
const h2TypingElement = document.getElementById("typing"); // For the redundant h2 in the original file

function typeEffect(element, text) {
    // If the element doesn't exist, stop
    if (!element) return;

    if (isDeleting) {
        // Deleting
        element.textContent = text.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Typing
        element.textContent = text.substring(0, charIndex + 1);
        charIndex++;
    }

    let currentWord = typingWords[wordIndex];
    let waitTime = isDeleting ? deleteSpeed : speed;

    // Check if word is fully typed
    if (!isDeleting && charIndex === currentWord.length) {
        waitTime = delay; // Pause at end of typing
        isDeleting = true;
    }
    // Check if word is fully deleted
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        waitTime = 500; // Short pause before starting next word
    }

    // Pass the correct element to the next call
    setTimeout(() => typeEffect(element, currentWord), waitTime);
}

// Start the typing effect on the main animated element
if (animatedTextElement) {
    typeEffect(animatedTextElement, typingWords[wordIndex]);
}
// Start the typing effect on the redundant h2 element (for robustness)
if (h2TypingElement) {
    // Note: To prevent two conflicting typing animations, we'll only run the main one.
    // However, for completeness, the function is ready if needed.
}


// 3. Scroll Reveal/Fade-In Animation

const faders = document.querySelectorAll('.fade-in-on-scroll');

const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px" // Start fade-in 100px before reaching viewport bottom
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});


// 4. Skill Bar Animation on Visibility

const skillItems = document.querySelectorAll('.skill-item');

const skillOptions = {
    threshold: 0.5, // Trigger when 50% of the element is visible
    rootMargin: "0px 0px -50px 0px"
};

const skillObserver = new IntersectionObserver(function (entries, skillObserver) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }

        const skillLevel = entry.target.querySelector('.skill-level');
        const percentSpan = entry.target.querySelector('[data-percent]');
        const level = skillLevel.getAttribute('data-level');
        const color = skillLevel.getAttribute('data-color');
        const percent = parseInt(percentSpan.getAttribute('data-percent'));

        // Apply style and width to animate the bar
        skillLevel.style.width = level;
        skillLevel.style.backgroundColor = color;

        // Animate the percentage count
        let currentPercent = 0;
        const countInterval = setInterval(() => {
            if (currentPercent >= percent) {
                clearInterval(countInterval);
                percentSpan.textContent = `${percent}%`; // Ensure it ends exactly on the target percent
                return;
            }
            currentPercent++;
            percentSpan.textContent = `${currentPercent}%`;
        }, 15); // Speed of the counter

        // Stop observing once animated
        skillObserver.unobserve(entry.target);
    });
}, skillOptions);

skillItems.forEach(item => {
    skillObserver.observe(item);
});