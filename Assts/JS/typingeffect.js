const textArray = [
  "Generate Delicious Recipes",
  "Your Personal AI Chef",
  "Smart Cooking Assistant",
  "Prompt to Plate Magic",
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textIndex = 0;
let charIndex = 0;

const typedText = document.getElementById("typed-text");
const cursor = document.querySelector(".cursor");

function type() {
  if (charIndex < textArray[textIndex].length) {
    typedText.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textIndex++;
    if (textIndex >= textArray.length) textIndex = 0;
    setTimeout(type, typingDelay);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (textArray.length) setTimeout(type, newTextDelay);
}); 

//////////////////////// circle Animation ///////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("circle");
  const images = container.querySelectorAll("img");
  const canvas = document.getElementById("pathCanvas");
  const ctx = canvas.getContext("2d");

  const radius = 300;
  const centerX = 300;
  const centerY = 250;
  const moveDuration = 6000;
  const gapTime = 2000;
  const totalCycle = moveDuration + gapTime * (images.length - 1);

  // Draw half circle dotted path
  function drawPath() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.setLineDash([8, 6]); // 8px line, 6px gap
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false); // Half circle arc
    ctx.strokeStyle = "#0d6efd"; // Bootstrap primary color
    ctx.lineWidth = 3;
    ctx.shadowBlur = 0; // No glow for clean dotted effect
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash pattern for other drawings
  }

  function easeInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  }

  function positionImage(img, angle) {
    const rad = (angle * Math.PI) / 180;
    const x = centerX + radius * Math.cos(rad) - img.offsetWidth / 2;
    const y = centerY - radius * Math.sin(rad) - img.offsetHeight / 2;
    img.style.transform = `translate(${x}px, ${y}px)`;
  }

  let start = null;
  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;

    drawPath(); // Always draw the dotted path

    images.forEach((img, i) => {
      const delay = gapTime * i;
      let t = ((elapsed - delay) % totalCycle) / moveDuration;
      if (t < 0) t += 1;

      if (t >= 0 && t <= 1) {
        const eased = easeInOutSine(t);
        const angle = eased * 180;
        positionImage(img, angle);
        img.style.opacity = 1;
      } else {
        img.style.opacity = 0;
      }
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
