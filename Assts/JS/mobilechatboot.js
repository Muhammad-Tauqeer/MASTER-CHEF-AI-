function navbarshow(){
    const navbar = document.getElementById("mob-nav");
    navbar.style.left = "0px";
}
function navbarhide(){
    const navbar = document.getElementById("mob-nav");
    navbar.style.left = "-250px"; // jitni width hai utna negative
}
////////////// send /////////////////////
async function Submit() {
    const secBox = document.getElementById("sec-box");
    secBox.classList.add("d-none");
    const textget = document.getElementById("textgets").value;
    if (!textget.trim()) return;

    const chat_con = document.getElementById("conversation");

    const userbox = document.createElement("div");
    userbox.classList.add("user", "message");
    
    // 👇 User message character limit aur "Show more" feature
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
    document.getElementById("textgets").value = "";

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
                                    text: `Aap ek helpful Master Chef assistant hain. "${textget}".`,
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
            aibox.innerText = `❌ API se error mila: ${errorData.error.message}`;
            return;
        }

        const data = await response.json();
        aibox.innerHTML = ""; // Clear the "Thinking..." text

        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
            const responseText = data.candidates[0].content.parts[0].text;
            
            const responseTextSpan = document.createElement("span");
            responseTextSpan.innerText = responseText;
            aibox.appendChild(responseTextSpan);

            // 👇 AI message ke liye copy button
            const copyButton = document.createElement("button");
            copyButton.innerHTML = `<i class="bi bi-clipboard"></i>`
            copyButton.classList.add("copy-btn"); 

            copyButton.addEventListener("click", () => {
                navigator.clipboard.writeText(responseText)
                    .then(() => {
                        copyButton.innerHTML = "Copied!";
                        setTimeout(() => {
                            copyButton.innerHTML = `<i class="bi bi-clipboard"></i>`;
                        }, 2000); 
                    })
                    .catch(err => {
                        console.error('Failed to copy text: ', err);
                        copyButton.innerText = "Error!";
                        setTimeout(() => {
                            copyButton.innerHTML = '<i class="bi bi-clipboard"></i>';
                        }, 2000);
                    });
            });

            aibox.appendChild(copyButton);

        } else {
            console.error("No candidates in response:", data);
            aibox.innerText = "⚠️ Maaf kijiye, AI ne koi jawab nahi diya.";
        }
    } catch (err) {
        console.error("API call failed:", err);
        aibox.innerText = "❌ Failed to connect to AI. Please check your network.";
    }
}

