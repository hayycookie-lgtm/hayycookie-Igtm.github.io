(function() {
    const music = document.getElementById('bgMusic');
    
    // 1. Instantly check if music should be playing
    const isPlaying = localStorage.getItem('musicPlaying');
    const savedTime = localStorage.getItem('musicTime');

    if (music && isPlaying === 'true') {
        // --- VOLUME SETTING ---
        music.volume = 0.1; 
        
        // 2. Set the time BEFORE playing to avoid starting at 0:00
        if (savedTime) {
            music.currentTime = parseFloat(savedTime) + 0.1; 
        }
        
        // 3. Play immediately
        music.play().catch(() => {
            document.addEventListener('click', () => music.play(), { once: true });
        });
    }

    // 4. Save time frequently
    setInterval(() => {
        if (music && !music.paused) {
            localStorage.setItem('musicTime', music.currentTime);
        }
    }, 100);
})();

const msgBtn = document.getElementById("msgBtn");
const msgTab = document.getElementById("msgTab");
const glitchOverlay = document.getElementById("glitchOverlay");

// SEND MESSAGE BUTTON IN CONTACT BOX
if (msgBtn) {
  msgBtn.addEventListener("click", function() {
    const clickSfx = document.getElementById('clickSound');
    if (clickSfx) {
        clickSfx.currentTime = 0;
        clickSfx.volume = 0.1; // SET SOFTER VOLUME HERE
        clickSfx.play();
    }

    glitchOverlay.style.display = "block";
    setTimeout(() => {
      window.location.href = "lunachat.html"; 
    }, 800);
  });
}

// WHITE BLINKING MESSAGES TAB
if (msgTab) {
  msgTab.addEventListener("click", function() {
    const clickSfx = document.getElementById('clickSound');
    if (clickSfx) {
        clickSfx.currentTime = 0;
        clickSfx.volume = 0.3; // SET SOFTER VOLUME HERE
        clickSfx.play();
    }
    
    setTimeout(() => {
        window.location.href = "lunachat.html";
    }, 400);
  });
}

// --- GLOBAL CLICK SOUND (mouse.mp3) ---
window.addEventListener('click', (e) => {
    // Prevent double-firing on the message triggers
    if (e.target.id === "msgTab" || e.target.id === "msgBtn" || e.target.closest("#msgBtn")) return;

    const clickSfx = document.getElementById('clickSound');
    if (clickSfx) {
        clickSfx.currentTime = 0; 
        clickSfx.volume = 0.3; // MATCHING SOFTER VOLUME
        clickSfx.play().catch(e => console.log("Audio interaction required"));
    }
});