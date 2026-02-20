(function() {
    const music = document.getElementById('bgMusic');
    
    const isPlaying = localStorage.getItem('musicPlaying');
    const savedTime = localStorage.getItem('musicTime');

    if (music && isPlaying === 'true') {
        music.volume = 0.1; 
        if (savedTime) {
            music.currentTime = parseFloat(savedTime) + 0.1;
        }
        music.play().catch(() => {
            document.addEventListener('click', () => music.play(), { once: true });
        });
    }

    setInterval(() => {
        if (music && !music.paused) {
            localStorage.setItem('musicTime', music.currentTime);
        }
    }, 100);
})();

document.addEventListener("DOMContentLoaded", () => {
    const logOffBtn = document.getElementById("logOffBtn");

    if (logOffBtn) {
        logOffBtn.addEventListener("click", () => {
            // Trigger the black fade overlay
            const fadeOverlay = document.getElementById("fadeOverlay");
            if (fadeOverlay) fadeOverlay.classList.add("active");
            
            // Trigger the music fade and redirect
            fadeAndLogOff();
        });
    }
});

function fadeAndLogOff() {
    const music = document.getElementById('bgMusic');
    
    // Smoothly fade music volume to 0
    let fadeAudio = setInterval(() => {
        if (music && music.volume > 0.01) {
            music.volume -= 0.01;
        } else {
            if(music) music.pause();
            clearInterval(fadeAudio);
        }
    }, 100); 

    // Wait 2 seconds (matching the CSS transition) before redirecting
    setTimeout(() => {
        window.location.href = "index.html"; // Fixed: Now points to index.html
    }, 2000);
}

// --- GLOBAL CLICK SOUND (mouse.mp3) ---
window.addEventListener('click', () => {
    const clickSfx = document.getElementById('clickSound');
    if (clickSfx) {
        clickSfx.currentTime = 0;
        clickSfx.volume = 0.4;
        clickSfx.play().catch(e => console.log("Audio interaction required"));
    }
});(function() {
    const music = document.getElementById('bgMusic');
    
    const isPlaying = localStorage.getItem('musicPlaying');
    const savedTime = localStorage.getItem('musicTime');

    if (music && isPlaying === 'true') {
        music.volume = 0.1; 
        if (savedTime) {
            music.currentTime = parseFloat(savedTime) + 0.1;
        }
        music.play().catch(() => {
            document.addEventListener('click', () => music.play(), { once: true });
        });
    }

    setInterval(() => {
        if (music && !music.paused) {
            localStorage.setItem('musicTime', music.currentTime);
        }
    }, 100);
})();

document.addEventListener("DOMContentLoaded", () => {
    const logOffBtn = document.getElementById("logOffBtn");

    if (logOffBtn) {
        logOffBtn.addEventListener("click", () => {
            // Trigger the black fade overlay
            const fadeOverlay = document.getElementById("fadeOverlay");
            if (fadeOverlay) fadeOverlay.classList.add("active");
            
            // Trigger the music fade and redirect
            fadeAndLogOff();
        });
    }
});

function fadeAndLogOff() {
    const music = document.getElementById('bgMusic');
    
    // Smoothly fade music volume to 0
    let fadeAudio = setInterval(() => {
        if (music && music.volume > 0.01) {
            music.volume -= 0.01;
        } else {
            if(music) music.pause();
            clearInterval(fadeAudio);
        }
    }, 100); 

    // Wait 2 seconds (matching the CSS transition) before redirecting
    setTimeout(() => {
        window.location.href = "index.html"; // Fixed: Now points to index.html
    }, 2000);
}

// --- GLOBAL CLICK SOUND (mouse.mp3) ---
window.addEventListener('click', () => {
    const clickSfx = document.getElementById('clickSound');
    if (clickSfx) {
        clickSfx.currentTime = 0;
        clickSfx.volume = 0.4;
        clickSfx.play().catch(e => console.log("Audio interaction required"));
    }
});