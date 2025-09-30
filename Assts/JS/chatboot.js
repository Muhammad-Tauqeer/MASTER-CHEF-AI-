function longnavbar() {
    document.getElementById("shortnavbar").classList.add("d-none");
    document.getElementById("longnavbar").classList.remove("d-none");
    document.getElementById("navbar").classList.remove("short_navbar");
    document.getElementById("navbar").classList.add("long-navbar");
}

function shortnavbar() {
    document.getElementById("shortnavbar").classList.remove("d-none");
    document.getElementById("longnavbar").classList.add("d-none");
    document.getElementById("navbar").classList.add("short_navbar");
    document.getElementById("navbar").classList.remove("long-navbar");
}

////////////////////// Send Message And Display Meassage /////////////////////////////
let voice;
let aiResponses = [];  

async function send() {
    const tempbox = document.getElementById("teampray_box");
    if (tempbox) tempbox.classList.add("d-none");

    const textget = document.getElementById("search").value;
    if (!textget.trim()) return;

    const chat_con = document.getElementById("chat-container");

    // ----------- User Message -----------
    const userbox = document.createElement("div");
    userbox.classList.add("user", "message");

    if (textget.length > 100) {
        const shortText = textget.substring(0, 100) + "...";
        const fullText = textget;

        const spanElement = document.createElement("span");
        spanElement.innerText = shortText;

        const showMoreBtn = document.createElement("a");
        showMoreBtn.href = "#";
        showMoreBtn.classList.add("show-more");
        showMoreBtn.innerText = "Show more";

        showMoreBtn.addEventListener("click", (event) => {
            event.preventDefault();
            spanElement.innerText = fullText;
            showMoreBtn.style.display = "none";
        });

        userbox.appendChild(spanElement);
        userbox.appendChild(showMoreBtn);
    } else {
        userbox.innerText = textget;
    }

    chat_con.appendChild(userbox);
    document.getElementById("search").value = "";

    // ----------- AI Placeholder -----------
    const aibox = document.createElement("div");
    aibox.classList.add("ai", "message");
    aibox.innerText = "Thinking... 🤔";
    chat_con.appendChild(aibox);

    try {
        const gemini_api_key = "AIzaSyADdbwunvicyXAHG5TDBHMXM_FaNXGbAhA";

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": gemini_api_key,
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `You are APP For Master Chef AI . Give only recipe related answers in English: ${textget}`,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error Response:", errorData);
            aibox.innerText = `❌ API se error: ${errorData.error.message}`;
            return;
        }

        const data = await response.json();
        aibox.innerHTML = "";

        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
            const responseText = data.candidates[0].content.parts[0].text;

            aiResponses.push(responseText);

            const responseTextSpan = document.createElement("span");
            responseTextSpan.innerText = responseText;
            aibox.appendChild(responseTextSpan);

            // ------- Actions (Like, Copy, Voice) -------
            const actions = document.createElement("div");
            actions.classList.add("actions");

            // ❤️ Like
            const likeBtn = document.createElement("button");
            likeBtn.innerHTML = "🤍";
            likeBtn.classList.add("like-btn");
            likeBtn.addEventListener("click", () => {
                likeBtn.classList.toggle("liked");
                likeBtn.innerHTML = likeBtn.classList.contains("liked") ? "❤️" : "🤍";
            });

            // 📋 Copy
            const copyBtn = document.createElement("button");
            copyBtn.innerHTML = "📋";
            copyBtn.addEventListener("click", async () => {
                await navigator.clipboard.writeText(responseText);
                showToast("✅ Copied!");
            });

            // 🔊 Voice
            const voiceBtn = document.createElement("button");
            voiceBtn.innerHTML = "🔊";
            voiceBtn.addEventListener("click", () => {
                if (voice && speechSynthesis.speaking) {
                    speechSynthesis.cancel();
                    voice = null;
                    voiceBtn.innerHTML = "🔊";
                } else {
                    voice = new SpeechSynthesisUtterance(responseText);
                    speechSynthesis.speak(voice);
                    voiceBtn.innerHTML = "⏹️";
                    voice.onend = () => {
                        voiceBtn.innerHTML = "🔊";
                        voice = null;
                    };
                }
            });

            actions.appendChild(likeBtn);
            actions.appendChild(copyBtn);
            actions.appendChild(voiceBtn);

            aibox.appendChild(actions);

        } else {
            console.error("No candidates in response:", data);
            aibox.innerText = "⚠️ Sorry, AI did not return any response.";
        }
    } catch (err) {
        console.error("API call failed:", err);
        aibox.innerText = "❌ Failed to connect to AI. Please check your network.";
    }
}

// ✅ Toast function (for copy msg)
function showToast(msg) {
    let toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerText = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ✅ Enter key ka fix
document.getElementById("search").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    send();
  }
});

// ✅ New Chat



// Enter key ka fix
document.getElementById("search").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Page reload rokne ke liye
    send();
  }
});

/////////////////////////////////// new chat ////////////////////////////////
function newchat() {
    const chat_con = (document.getElementById("chat-container").innerHTML = "");
    const tempbox = document.getElementById("teampray_box");
    tempbox.classList.remove("d-none");
    document.getElementById("search_chat_box").classList.add("d-none");
        let Hubarea = document.getElementById("HubArea");
    Hubarea.classList.remove("fadein");
    Hubarea.classList.add("d-none");
}

/////////////////////////////// search Chat ///////////////////////////
function closeBox() {
    const box = document.getElementById("search_chat_box");
    box.classList.remove("showBox");
    box.classList.add("hideBox");
    setTimeout(() => {
        box.classList.add("d-none");
    }, 500);
}

function shearchchat() {
    const box = document.getElementById("search_chat_box");
    const tempbox = document.getElementById("teampray_box");

    box.classList.remove("d-none", "hideBox");
    void box.offsetWidth;
    box.classList.add("showBox");

    tempbox.classList.add("d-none");
     let Hubarea = document.getElementById("HubArea");
    Hubarea.classList.remove("fadein");
    Hubarea.classList.add("d-none");
}

function filterChats(event) {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let chats = document.querySelectorAll("#chatList .chat");

    chats.forEach(chat => {
        let text = chat.textContent.toLowerCase();
        chat.style.display = text.includes(input) ? "block" : "none";
    });
}

// Get the button and the pop-up elements
const openPopupBtn = document.getElementById('open-popup-btn');
const closePopupBtn = document.getElementById('close-popup-btn');
const popupContainer = document.getElementById('popup-container');

// Function to open the pop-up
function openPopup() {
    popupContainer.classList.add('show');
}

// Function to close the pop-up
function closePopup() {
    popupContainer.classList.remove('show');
}

// Event listeners for the buttons
if (openPopupBtn) openPopupBtn.addEventListener('click', openPopup);
if (closePopupBtn) closePopupBtn.addEventListener('click', closePopup);

// Close the pop-up if the user clicks outside of the content
window.addEventListener('click', (event) => {
    if (event.target === popupContainer) {
        closePopup();
    }
});

/////////////////////////////////Hub Area Codes ////////////////////////////////////////////////
function Hubarea() {
    let Hubarea = document.getElementById("HubArea");
    Hubarea.classList.add("fadein");
    Hubarea.classList.remove("d-none");
    const box = document.getElementById("search_chat_box");
    box.classList.remove("showBox");
    box.classList.add("hideBox");
    setTimeout(() => {
        box.classList.add("d-none");
    }, 500);
     const tempbox = document.getElementById("teampray_box");
    if (tempbox) tempbox.classList.add("d-none");
    
}

function exit() {
    let Hubarea = document.getElementById("HubArea");
    Hubarea.classList.remove("fadein");
    Hubarea.classList.add("d-none");
    const chat_con = document.getElementById("chat-container");
    if (chat_con.innerHTML.trim() === "") {
  const tempbox = document.getElementById("teampray_box");
  tempbox.classList.remove("d-none");
}
}

///////////////////  Recipe Hub Genertae recipe ////////////////////
document.addEventListener('DOMContentLoaded', () => {
            const backgroundContainer = document.getElementById('body');
            const leafImages = [
                '../Pics/121.png',
                '../Pics/122.png',
                '../Pics/123.png',
                '../Pics/121.png',
                '../Pics/122.png',
                '../Pics/123.png',
                '../Pics/121.png',
                '../Pics/122.png',
                '../Pics/123.png'
            ];

            function createLeaf() {
                const leaf = document.createElement('div');
                leaf.classList.add('leaf');
                leaf.style.left = `${Math.random() * 100}vw`;
                leaf.style.top = `-10vh`;
                leaf.style.backgroundImage = `url('${leafImages[Math.floor(Math.random() * leafImages.length)]}')`;
                
                const size = Math.random() * 50 + 20; // Random size between 20px and 70px
                leaf.style.width = `${size}px`;
                leaf.style.height = `${size}px`;
                
                const animationDuration = Math.random() * 5 + 8; // Random duration between 8s and 13s
                leaf.style.animationDuration = `${animationDuration}s`;
                
                backgroundContainer.appendChild(leaf);
                
                setTimeout(() => {
                    leaf.remove();
                }, animationDuration * 1000);
            }

            setInterval(createLeaf, 500); // Create a new leaf every 0.5 seconds
        });
        const textarea = document.getElementById("search");
  
  textarea.addEventListener("input", () => {
    textarea.style.height = "auto"; // reset
    textarea.style.height = Math.min(textarea.scrollHeight, 72) + "px"; 
    // 72px ≈ 3 rows (24px * 3) -> apke font-size ke hisaab se adjust karein
  });
