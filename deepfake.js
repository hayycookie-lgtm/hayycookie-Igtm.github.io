(function() {
    const music = document.getElementById('bgMusic');
    
    // 1. Music Sync Logic
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

    // 2. Save time frequently
    setInterval(() => {
        if (music && !music.paused) {
            localStorage.setItem('musicTime', music.currentTime);
        }
    }, 100);
})();

// 3. Trigger the Deepfake Alert & Handle Click
window.addEventListener("DOMContentLoaded", () => {
    const alertOverlay = document.getElementById("alertOverlay");
    
    // Show the alert after 2 seconds and play error sound
    setTimeout(() => {
        if (alertOverlay) {
            alertOverlay.style.display = "flex";
            
            // Play the error sound
            const errorSfx = new Audio('error.mp3');
            errorSfx.volume = 0.4; // Slightly louder than bg music for warning impact
            errorSfx.play().catch(err => console.log("Error sound blocked until user interaction"));
        }
    }, 2000);

    // Using "true" at the end for Capture Phase - ensures sound fires FIRST
    document.addEventListener("click", (e) => {
        const clickSfx = document.getElementById('clickSound');
        
        // Play sound for EVERY click on the page
        if (clickSfx) {
            clickSfx.currentTime = 0;
            clickSfx.volume = 0.3; // Softer volume as requested previously
            clickSfx.play().catch(err => console.log("Audio waiting for user interaction"));
        }

        // Check if the clicked element (or its parent) is the try-again button
        const isTryAgain = e.target.classList.contains('try-again-btn') || e.target.closest('.try-again-btn');

        if (isTryAgain) {
            e.preventDefault(); 
            e.stopPropagation();

            // Delay to ensure the soft sound is heard before redirecting
            setTimeout(() => {
                window.location.href = "retry.html"; 
            }, 600);
        }
    }, true); 
});