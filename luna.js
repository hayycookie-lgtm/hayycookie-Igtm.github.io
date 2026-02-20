const text = "Hey, I'm Luna.";
const textElement = document.getElementById("lunaText");
const fadeOverlay = document.getElementById("fadeOverlay");
const glitchOverlay = document.getElementById("glitchOverlay");

// Audio Elements
const kbSound = document.getElementById("kbSound");
const glitchSound = document.getElementById("glitchSound");

let i = 0;
let isRedirecting = false; // Flag to prevent multiple triggers

// Browsers block audio unless the user clicks first
document.addEventListener('click', () => {
    if (i === 0) {
        textElement.innerHTML = "";
        typeWriter();
    }
}, { once: true });

function typeWriter() {
  if (i < text.length) {
    if (kbSound.paused) kbSound.play();
    textElement.innerHTML = text.slice(0, i + 1) + '<span class="cursor">|</span>';
    i++;
    setTimeout(typeWriter, 150);
  } else {
    kbSound.pause();
    kbSound.currentTime = 0; 
    textElement.innerHTML = text; 
    setTimeout(() => fadeToLogin(), 500); 
  }
}

function fadeToLogin() {
  if (isRedirecting) return; // Stop if already in progress
  isRedirecting = true;

  if (glitchSound) {
    glitchSound.volume = 0.1; 
    glitchSound.play();
  }

  // Show glitch GIF
  glitchOverlay.style.display = "block";

  fadeOverlay.style.display = "block";
  fadeOverlay.style.opacity = 0;
  let opacity = 0;

  const interval = setInterval(() => {
    opacity += 0.05;
    fadeOverlay.style.opacity = opacity;

    if (opacity >= 1.2) { // Fade slightly past 1 to ensure total black
      clearInterval(interval);
      // Use replace to prevent the "back button" loop
      window.location.replace("login.html"); 
    }
  }, 50);
}

// --- GLOBAL CLICK SOUND ---
window.addEventListener('click', () => {
    const clickSfx = document.getElementById('clickSound');
    if (clickSfx) {
        clickSfx.currentTime = 0;
        clickSfx.volume = 0.4;
        clickSfx.play().catch(e => console.log("Audio wait"));
    }
});