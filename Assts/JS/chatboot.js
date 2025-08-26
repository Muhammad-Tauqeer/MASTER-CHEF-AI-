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
function send() {
  const tempbox = document.getElementById("teampray_box"); // get the temporary text display box
  tempbox.classList.add("d-none"); // hide temp Box

  const textget = document.getElementById("search").value; // get the entered text
  if (!textget.trim()) return; // prevent empty messages

  const userbox = document.createElement("div"); // create a user text display div
  userbox.classList.add("user", "message"); // add classes "user" and "message"
  userbox.innerText = textget; // set the user's message text

  const chat_con = document.getElementById("chat-container"); // get the chat container
  chat_con.appendChild(userbox); // append userbox to container

  document.getElementById("search").value = ""; // clear input after

  // check for AI response
  if (textget.toLowerCase() === "hi") {
    const aibox = document.createElement("div"); // create AI response box
    aibox.classList.add("ai", "message"); // add classes "ai" and "message"
    aibox.innerText = "Hey! How’s it going?"; // AI response
    chat_con.appendChild(aibox); // append AI box (fixed line)
  } else if (textget.toLowerCase() === "biryani") {
    const aibox = document.createElement("div"); // create AI response box
    aibox.classList.add("ai", "message"); // add classes "ai" and "message"

    aibox.innerText = `🍗 Simple Chicken Biryani Recipe 🍚

1. Soak 2 cups basmati rice for 30 minutes.
2. Fry 3 sliced onions golden brown, keep half aside for garnish.
3. Add 500g chicken + 2 tbsp ginger-garlic paste + spices (turmeric, chili powder, biryani masala).
4. Add 2 chopped tomatoes, ½ cup yogurt, coriander & mint leaves. Cook until chicken is done.
5. Boil rice 70% cooked, drain.
6. Layer chicken masala → rice → fried onions (repeat).
7. Sprinkle saffron milk or food color (optional).
8. Cover & cook on low flame (“dum”) for 20 minutes.
9. Serve hot with raita & salad.`;

    chat_con.appendChild(aibox);
  }
    else if (textget.toLowerCase() === "home"){
      window.location.href = "../../index.html";
  } else {
    const aibox = document.createElement("div"); // create AI response box
    aibox.classList.add("ai", "message"); // add classes "ai" and "message"

    aibox.innerText = "Sorry D'ont Get answer please correct spelling"
    chat_con.appendChild(aibox);
  }
}
document.getElementById("search").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // stop form from refreshing
    send(); // call your function
  }
});
             /////////////////////////////////// new chat ////////////////////////////////
function newchat(){
    const chat_con = document.getElementById("chat-container").innerHTML ="";
    const tempbox = document.getElementById("teampray_box"); // get the temporary text display box
  tempbox.classList.remove("d-none"); // hide temp Box
}

            /////////////////////////////// search Chat ///////////////////////////
  function closeBox() {
  document.getElementById("search_chat_box").classList.add("d-none");
}
function shearchchat(){
  document.getElementById("search_chat_box").classList.remove("d-none");
const tempbox = document.getElementById("teampray_box"); // get the temporary text display box
  tempbox.classList.add("d-none");
}

