function startChat() {
    const overlay = document.getElementById('transition-overlay');
    const music = document.getElementById('bgMusic');
    const loadingBar = document.getElementById('loadingBar');
    const loadingContainer = document.getElementById('loadingBarContainer');
    const clickSfx = document.getElementById('clickSound');

    // 1. Play Click Sound
    if (clickSfx) {
        clickSfx.currentTime = 0;
        clickSfx.volume = 0.5;
        clickSfx.play();
    }
    
    // 2. Start Music
    if (music) {
        music.volume = 0.1; 
        music.play();
        localStorage.setItem('musicPlaying', 'true');
        localStorage.setItem('musicTime', music.currentTime);
    }

    // 3. Activate Fade Overlay (Fades from transparent to black)
    overlay.classList.add('active');

    // 4. Fill the Loading Bar
    setTimeout(() => {
        loadingBar.style.width = "100%";
    }, 500);

    // 5. Fade out the LOADING BAR only (to leave a black screen)
    // Runs after bar fills (500ms delay + 2500ms transition = 3000ms)
    setTimeout(() => {
        loadingContainer.classList.add('fade-exit');
    }, 3000);

    // 6. Finally, move to the next page
    setTimeout(() => {
        if (music) {
            localStorage.setItem('musicTime', music.currentTime);
        }
        window.location.href = "intro.html"; 
    }, 4000); 
}

// Global Click Sound
window.addEventListener('click', (e) => {
    if (!e.target.classList.contains('login-btn')) {
        const clickSfx = document.getElementById('clickSound');
        if (clickSfx) {
            clickSfx.currentTime = 0;
            clickSfx.volume = 0.1; // Using your preferred soft volume
            clickSfx.play().catch(err => console.log("Audio waiting for interaction"));
        }
    }
});