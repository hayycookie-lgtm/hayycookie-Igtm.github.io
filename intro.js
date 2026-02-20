(function() {
    const music = document.getElementById('bgMusic');
    
    // 1. Instantly check if music should be playing
    const isPlaying = localStorage.getItem('musicPlaying');
    const savedTime = localStorage.getItem('musicTime');

    if (music && isPlaying === 'true') {
        // --- VOLUME SETTING ---
        music.volume = 0.1; // Reduces volume to 20%
        
        // 2. Set the time BEFORE playing to avoid starting at 0:00
        if (savedTime) {
            music.currentTime = parseFloat(savedTime) + 0.1; // Add a tiny offset for load time
        }
        
        // 3. Play immediately
        music.play().catch(() => {
            // If autoplay is blocked, wait for first click
            document.addEventListener('click', () => music.play(), { once: true });
        });
    }

    // 4. Save time VERY frequently (every 100ms) 
    setInterval(() => {
        if (music && !music.paused) {
            localStorage.setItem('musicTime', music.currentTime);
        }
    }, 100);
})();


const introText = "Welcome to CyberSesh!\nChat with friends, explore topics, join forums.\nReady to start?";

const textElement = document.getElementById("introText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const fadeOverlay = document.getElementById("fadeOverlay");

let i = 0;

function typeWriter() {
  if (i < introText.length) {
    let char = introText[i];
    if (char === "\n") char = "<br>";
    textElement.innerHTML += char;
    i++;
    setTimeout(typeWriter, 40); // typing speed
  } else {
    // fade in YES and NO together
    yesBtn.style.opacity = 0;
    noBtn.style.opacity = 0;
    yesBtn.style.display = "inline";
    noBtn.style.display = "inline";

    let opacity = 0;
    const timer = setInterval(() => {
      opacity += 0.1;
      yesBtn.style.opacity = opacity;
      noBtn.style.opacity = opacity;
      if (opacity >= 1) clearInterval(timer);
    }, 50);
  }
}

typeWriter();

// YES → Fade to black then Profile
yesBtn.addEventListener("click", function() {
  fadeOverlay.classList.add("active");
  
  // INCREASED DELAY: Changed from 500 to 1000 for a longer transition
  setTimeout(() => {
    window.location.href = "profile.html"; 
  }, 1000);
});

// NO → alert
noBtn.addEventListener("click", function() {
  alert("Come back when you are ready!");
});

// --- GLOBAL CLICK SOUND (mouse.mp3) ---
window.addEventListener('click', () => {
    const clickSfx = document.getElementById('clickSound');
    if (clickSfx) {
        clickSfx.currentTime = 0; // Reset for rapid clicks
        clickSfx.volume = 0.4;    // Set volume level
        clickSfx.play().catch(e => console.log("Audio interaction required"));
    }
});