// Store modal content
const modalContent = `
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <h1>AI Recipe on Demand</h1>
    <p>
      The AI Recipe on Demand feature instantly creates personalized, unique recipes
      tailored to your available ingredients, dietary preferences, or favorite cuisines.
      Acting like a smart digital sous-chef, it can even use photo recognition to identify
      ingredients and help reduce food waste. Along with custom recipes, it provides
      step-by-step cooking guidance and nutritional information—making meal planning both
      effortless and inspiring.
    </p>
    <img src="Assts/Pics/recipeOndemand.png" />
  </div>
`;
const modalContent1 = `
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <h1>AI Voice-to-Recipe Prompting</h1>
    <p>
      This feature allows users to speak their recipe prompt directly to the app, eliminating the need for typing. The AI uses advanced voice recognition to instantly transcribe the spoken command (e.g., "Make a quick dinner with chicken and broccoli, no spice"), automatically process it as a text prompt, and immediately generate the tailored recipe. This provides a truly hands-free cooking experience, perfect for when your hands are busy in the kitchen.
    </p>
    <img src="Assts/Pics/voice.png" />
  </div>
`;
const modalContent2 = `
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <h1>Personalized Recipe Hub</h1>
    <p>
     This hub provides a limited, curated collection of pre-made recipes available for the user to select instantly. While most customized meals are created via AI prompts, this hub offers easy, one-click access to a few established recipes. A more comprehensive, customizable Recipe Hub feature will be launched soon.
    </p>
    <img src="Assts/Pics/recipehubs.png" />
  </div>
`;
const modalContent3 = `
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <h1>Smart & Fast Response</h1>
    <p>
     This feature ensures the AI provides intelligent and lightning-fast answers to all your cooking questions. It's designed to understand your queries quickly, whether you're asking for a recipe adjustment or a cooking tip. The AI's responses are not only rapid but also highly relevant and accurate, providing you with instant, helpful information based on the context of your conversation.
    </p>
    <img src="Assts/Pics/samrt.png" />
  </div>
`;
const modalContent4 = `
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <h1>Save Chat & AI Voice Readback</h1>
    <p>
     Automatically save your chats and recipes, while AI reads them aloud—keeping your ideas safe, your hands free, and your cooking effortless.
    </p>
    <img src="Assts/Pics/save.png" />
  </div>
`;
const modalContent5 = `
  <div class="modal-content">
    <span class="close-btn">&times;</span>
    <h1>Upcoming Features</h1>
    <p>
     The platform is continuously evolving! We have several more exciting and innovative features currently in development that will further enhance your cooking experience. Stay tuned for future updates as they will be rolling out soon!
    </p>
    <img src="Assts/Pics/uncompingfeautre.png" />
  </div>
`;


// Function that creates the modal
function fsone(content) {
  const mob_con = document.getElementById("feature-mob");

  // Check if a modal already exists
  if (!mob_con.querySelector(".modal")) {
    const mobPopups = document.createElement("div");
    mobPopups.classList.add("modal");

    // Insert the content
    mobPopups.innerHTML = content;

    mob_con.appendChild(mobPopups);

    // Add close functionality
    mobPopups.querySelector(".close-btn").addEventListener("click", () => {
      mob_con.removeChild(mobPopups);
    });
  }
}

// Example usage: show the modal

