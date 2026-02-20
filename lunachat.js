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
    // This makes sure that when you click a link, the saved time is accurate
    setInterval(() => {
        if (music && !music.paused) {
            localStorage.setItem('musicTime', music.currentTime);
        }
    }, 100);
})();

const chatContent = document.getElementById('chatContent');
const choiceArea = document.getElementById('choiceArea');

function addLunaMessage(text) {
    const row = document.createElement('div');
    row.className = 'message-row';
    row.innerHTML = `<img src="luna.jpeg" class="luna-avatar"><div class="luna-bubble"><span class="luna-name">lunaluvs22</span>${text}</div>`;
    chatContent.appendChild(row);
    chatContent.scrollTop = chatContent.scrollHeight;
}

function addStacyMessage(text) {
    const row = document.createElement('div');
    row.className = 'message-row stacy-row';
    row.innerHTML = `<div class="stacy-bubble"><span class="stacy-name">xstacyrocksx</span>${text}</div><img src="stacy.jpeg" class="stacy-avatar">`;
    chatContent.appendChild(row);
    chatContent.scrollTop = chatContent.scrollHeight;
}

function showChoices(options) {
    choiceArea.innerHTML = "";
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn-choice';
        btn.innerText = opt.text;
        btn.onclick = opt.action;
        choiceArea.appendChild(btn);
    });
}

function nudgeForSelfie() {
    choiceArea.innerHTML = "";
    addStacyMessage("No way, I don't send pics to strangers lol.");
    setTimeout(() => {
        addLunaMessage("Aww come on! I'm not a complete stranger, we go to schools near each other? I promise I'm real! :P");
        showChoices([{ text: "Fine, send selfie", action: sendSelfie }]);
    }, 1200);
}

function sendSelfie() {
    choiceArea.innerHTML = "";
    addStacyMessage("*sends selfie*");
    setTimeout(() => {
        addLunaMessage("Omg wait are you Jordan's friend? I think I know you from his pool party! Anyway, it's late so i'm off to bed, but it was nice talking to you. Let's game together some time xx");
        
        setTimeout(() => {
            showChoices([{ text: "Leave Chat", action: manualLogOff }]);
        }, 2000);
    }, 1500);
}

function manualLogOff() {
    choiceArea.innerHTML = "";
    addStacyMessage("*stacy has left chat*");
    
    // Trigger the notification shortly after logging off
    setTimeout(triggerTwist, 1500);
}

// Helper function to handle the profile click with sound
function goToProfile() {
    const clickSfx = document.getElementById('clickSound');
    if (clickSfx) {
        clickSfx.currentTime = 0;
        clickSfx.play();
    }
    setTimeout(() => {
        window.location.href = 'deepfake.html';
    }, 400); // 400ms delay to hear the click
}

function triggerTwist() {
    // Play the notification ding sound
    const ding = new Audio('ding.mp3');
    ding.volume = 0.3;
    ding.play().catch(e => console.log("Ding blocked by browser"));

    const popup = document.createElement('div');
    popup.id = "jessPopup";
    popup.style = "position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background:#fff0f3; border:4px solid #ff80c8; box-shadow:0 0 20px #ff80c8; padding:20px; text-align:center; z-index:1000; width:300px; color:#e60099;";
    popup.innerHTML = `
        <h2 style="font-family:'Orbitron'; font-size:18px;">NOTIFICATION</h2>
        <p style="font-family:'VT323'; font-size:18px;">'Jess' has added you as a friend using your recent photo.</p>
        <div style="display:flex; flex-direction:column; gap:10px;">
            <button onclick="goToProfile()" style="background:#ff80c8; color:white; border:none; padding:10px; cursor:pointer; font-family:'VT323'; font-size:16px;">VIEW PROFILE</button>
            <button style="background:transparent; color:#ff80c8; border:1px solid #ff80c8; padding:5px; cursor:not-allowed; font-family:'VT323'; font-size:14px;">CLOSE</button>
        </div>
    `;
    document.getElementById('introBox').appendChild(popup);
}

function askForSelfie() {
    addLunaMessage("OMG that's so near me. Wait, could I get a selfie? I wanna see if I recognise you! I'll send one too!");
    
    showChoices([
        { text: "Send Selfie", action: sendSelfie },
        { text: "No way", action: nudgeForSelfie }
    ]);
}

function startStory() {
    choiceArea.innerHTML = "";
    addStacyMessage("Hey, thanks! What's up?");
    setTimeout(() => {
        addLunaMessage("You seem really nice, what school do you go to btw? I feel like we might be close by!");
        showChoices([
            { text: "Share school", action: () => {
                choiceArea.innerHTML = "";
                addStacyMessage("I go to West Hawkins High! haha");
                setTimeout(askForSelfie, 1200);
            }},
            { text: "Refuse", action: () => {
                choiceArea.innerHTML = "";
                addStacyMessage("Idk, I try not to share my school online...");
                setTimeout(() => {
                    addLunaMessage("Omg valid! But I swear I know you. I'm at East hawkins!");
                    showChoices([{ text: "Oh really? I'm at West Hawkins", action: () => {
                        choiceArea.innerHTML = "";
                        addStacyMessage("Oh really? I'm at West Hawkins!");
                        setTimeout(askForSelfie, 1200);
                    }}]);
                }, 1200);
            }}
        ]);
    }, 1500);
}

function startIntro() {
    setTimeout(() => {
        addLunaMessage("Hey! I'm Luna. I saw your comment sharing tips under a Valorant forum! You seem really friendly and i'm wondering if you'd like to chat? :P");
        showChoices([
            { text: "Reply", action: startStory },
            { text: "Ignore", action: () => {
                choiceArea.innerHTML = "";
                setTimeout(() => {
                    addLunaMessage("Btw I'm not some creepy dude haha I promise! Just wanted to say hi.");
                    showChoices([{ text: "Reply now", action: startStory }]);
                }, 1000);
            }}
        ]);
    }, 800);
}

window.onload = startIntro;

// --- GLOBAL CLICK SOUND (mouse.mp3) ---
window.addEventListener('click', () => {
    const clickSfx = document.getElementById('clickSound');
    if (clickSfx) {
        clickSfx.currentTime = 0; // Reset for fast clicking
        clickSfx.volume = 0.4;    // Set volume level
        clickSfx.play().catch(e => console.log("Audio interaction required"));
    }
});