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
  // Get the main container for the animation
  const container = document.getElementById("circle");

  // Select all images inside the container (these will move along the path)
  const images = container.querySelectorAll("img");

  // Get the canvas where we’ll draw the dotted half-circle
  const canvas = document.getElementById("pathCanvas");
  const ctx = canvas.getContext("2d");

  // Fixed positioning values for the circle
  const radius = 300;    // Distance from center to path
  const centerX = 300;   // Horizontal center point of the arc
  const centerY = 250;   // Vertical center point of the arc

  // Timing controls
  const moveDuration = 6000; // How long each image takes to move from left to right (ms)
  const gapTime = 2000;      // Delay before the next image starts moving (ms)
  const totalCycle = moveDuration + gapTime * (images.length - 1); // Full animation loop time

  /**
   * Draw a dotted half-circle path on the canvas.
   * This path will be used as a visual guide for the moving images.
   */
  function drawPath() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear old drawings
    ctx.beginPath();

    ctx.setLineDash([8, 6]); // Make the stroke dotted: 8px line, 6px gap
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false); // Draw half-circle (left to right)

    ctx.strokeStyle = "#0d6efd"; // Blue color (Bootstrap primary)
    ctx.lineWidth = 3;           // Path thickness
    ctx.shadowBlur = 0;          // No glow effect
    ctx.stroke();

    ctx.setLineDash([]); // Reset dash style for any future drawings
  }

  /**
   * Easing function for smooth start and stop motion.
   * This makes the movement less robotic and more natural.
   */
  function easeInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  }

  /**
   * Place an image on the arc at a given angle.
   * @param {HTMLElement} img - The image element to position
   * @param {number} angle - The angle along the arc (0° = right end, 180° = left end)
   */
  function positionImage(img, angle) {
    const rad = (angle * Math.PI) / 180; // Convert angle to radians
    const x = centerX + radius * Math.cos(rad) - img.offsetWidth / 2; // X position
    const y = centerY - radius * Math.sin(rad) - img.offsetHeight / 2; // Y position
    img.style.transform = `translate(${x}px, ${y}px)`; // Move image with CSS transform
  }

  let start = null; // Timestamp when animation starts

  /**
   * Main animation loop.
   * Uses requestAnimationFrame for smooth motion at the browser's refresh rate.
   */
  function animate(timestamp) {
    if (!start) start = timestamp; // Set start time on first frame
    const elapsed = timestamp - start; // Time passed since animation began

    drawPath(); // Always draw the dotted path so it stays visible

    images.forEach((img, i) => {
      // Calculate the start delay for this image
      const delay = gapTime * i;

      // Calculate normalized time (0 to 1) for the current movement
      let t = ((elapsed - delay) % totalCycle) / moveDuration;

      // If image hasn't started yet, loop t back into range
      if (t < 0) t += 3;

      // If image is within its movement window
      if (t >= 0 && t <= 1) {
        const eased = easeInOutSine(t);   // Smooth motion
        const angle = eased * 180;        // Map eased progress to arc degrees
        positionImage(img, angle);        // Move image
        img.style.opacity = 1;            // Show image while moving
      } else {
        img.style.opacity = 0;            // Hide image when not moving
      }
    });

    // Request the next frame for continuous animation
    requestAnimationFrame(animate);
  }

  // Start the animation loop
  requestAnimationFrame(animate);
});
///////////////////////////////////////////////////////// curser aniamtion ///////////////////////////////////////////////

document.addEventListener("mousemove", function(e) {
    const ripple = document.createElement("div");
    ripple.className = "ripple";

    // Random glow color
    const colors = ["rgba(0,255,255,0.7)", "rgba(255,0,255,0.7)", "rgba(255,255,0,0.7)", "rgba(0,255,100,0.7)"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    ripple.style.border = `2px solid ${color}`;
    ripple.style.boxShadow = `0 0 20px ${color}`;

    ripple.style.left = `${e.pageX}px`;
    ripple.style.top = `${e.pageY}px`;

    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 1000);
});

/////////////////////////////////////////////// Scroll animtion/////////////////////////////
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

/////////////////////////// navbar ////////////////////////////////

document.body.addEventListener("dblclick", function(e) {
  e.preventDefault(); // double click pe text selection avoid kare
  document.querySelector(".secondaryNavbar").classList.toggle("secandary_navbar_active");
});

window.addEventListener("scroll", function() {
  const secondaryNavbar = document.querySelector(".secondaryNavbar");
  let scrollPosition = window.scrollY; // yeh missing tha
  let triggerPoint = window.innerHeight * 0.8; // 101vh

  if (scrollPosition <= triggerPoint) {
    secondaryNavbar.classList.remove("secandary_navbar_active"); 
  } else {
    secondaryNavbar.classList.add("secandary_navbar_active"); 
  }
});


////////////////////////////// tool tips ////////////////////////////
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltipTriggerList.forEach(el => {
  new bootstrap.Tooltip(el);
});