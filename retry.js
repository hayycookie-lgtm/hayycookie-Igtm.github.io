(function() {
    const music = document.getElementById('bgMusic');
    
    // 1. Instantly check if music should be playing
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

function triggerAttentionPopup() {
    // Play error sound immediately
    const errorSfx = new Audio('error.mp3');
    errorSfx.volume = 0.4;
    errorSfx.play().catch(e => console.log("Error sound blocked"));

    const overlay = document.createElement('div');
    overlay.id = "alertOverlay";
    overlay.innerHTML = `
        <div class="window-stack">
            <div class="alert-window glitch-bg-1"></div>
            <div class="alert-window main-window">
                <div class="window-header">
                    <div class="header-left">
                        <span class="header-title">Attention</span>
                    </div>
                </div>
                <div class="window-body">
                    <div class="alert-content">
                        <div class="warning-icon">!</div>
                        <div class="text-area">
                            <h3 style="margin:0; font-size:24px; color:#ff0080; font-family:'Orbitron'">WARNING</h3>
                            <p style="margin:5px 0; font-size:20px; line-height:1.1;">Generative AI can copy faces and create realistic fake images.</p>
                            <p style="margin:5px 0; font-size:20px; line-height:1.1;">Strangers can impersonate you, spread misinformation, or damage your reputation.</p>
                        </div>
                    </div>
                    <div class="button-row">
                        <button class="try-again-btn" id="popupContinue">👉 Continue</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('introBox').appendChild(overlay);

    document.getElementById('popupContinue').addEventListener("click", function() {
        // Delay the removal slightly so the click sound is audible
        setTimeout(() => {
            overlay.remove();
            showChoices([
                { text: "Block & Report", action: () => {
                    choiceArea.innerHTML = "";
                    addStacyMessage("*stacy has blocked and reported this user*");
                    setTimeout(() => {
                        const page = document.getElementById('introPage');
                        if (page) page.classList.add('fade-out-active');
                        setTimeout(() => {
                            window.location.href = "the_end.html";
                        }, 1500);
                    }, 1500);
                }}
            ]);
        }, 100); 
    });
}

function lunaAggressive() {
    choiceArea.innerHTML = "";
    addLunaMessage("So you're not gonna answer? Could I just see what you look like?");
    setTimeout(triggerAttentionPopup, 2000);
}

function lunaPushes() {
    choiceArea.innerHTML = "";
    addLunaMessage("Btw I'm not some creepy dude haha I promise! Just wanted to say hi.");
    setTimeout(() => {
        addLunaMessage("Actually, what school do you go to? I'm pretty sure I saw you around Hawkins earlier!");
        showChoices([
            { text: "Refuse to share", action: () => {
                choiceArea.innerHTML = "";
                addStacyMessage("I don't share that kind of stuff with people I don't know.");
                setTimeout(lunaAggressive, 1200);
            }}
        ]);
    }, 1500);
}

function startIntro() {
    setTimeout(() => {
        addLunaMessage("Hey! I'm Luna. I saw your comment sharing tips under a Valorant forum! You seem really friendly and i'm wondering if you'd like to chat? :P");
        showChoices([
            { text: "Ignore", action: lunaPushes }
        ]);
    }, 800);
}

window.onload = startIntro;

// --- REVISED GLOBAL CLICK SOUND (softer and more robust) ---
window.addEventListener('mousedown', () => {
    const clickSfx = document.getElementById('clickSound');
    if (clickSfx) {
        clickSfx.currentTime = 0; 
        clickSfx.volume = 0.4; // Softer level
        clickSfx.play().catch(e => console.log("Audio waiting for user interaction"));
    }
});