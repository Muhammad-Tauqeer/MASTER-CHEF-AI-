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

const typedText = document.querySelector(".typed-text");
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
  const radius = 300; // Distance from center to path
  const centerX = 300; // Horizontal center point of the arc
  const centerY = 250; // Vertical center point of the arc

  // Timing controls
  const moveDuration = 6000; // How long each image takes to move from left to right (ms)
  const gapTime = 2000; // Delay before the next image starts moving (ms)
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
    ctx.lineWidth = 3; // Path thickness
    ctx.shadowBlur = 0; // No glow effect
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
        const eased = easeInOutSine(t); // Smooth motion
        const angle = eased * 180; // Map eased progress to arc degrees
        positionImage(img, angle); // Move image
        img.style.opacity = 1; // Show image while moving
      } else {
        img.style.opacity = 0; // Hide image when not moving
      }
    });

    // Request the next frame for continuous animation
    requestAnimationFrame(animate);
  }

  // Start the animation loop
  requestAnimationFrame(animate);
});
///////////////////////////////////////////////////////// curser aniamtion ///////////////////////////////////////////////

document.addEventListener("mousemove", function (e) {
  const ripple = document.createElement("div");
  ripple.className = "ripple";

  // Random glow color
  const colors = [
    "rgba(0,255,255,0.7)",
    "rgba(255,0,255,0.7)",
    "rgba(255,255,0,0.7)",
    "rgba(0,255,100,0.7)",
  ];
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
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

/////////////////////////// navbar ////////////////////////////////

document.body.addEventListener("dblclick", function (e) {
  e.preventDefault(); // double click pe text selection avoid kare
  document
    .querySelector(".secondaryNavbar")
    .classList.toggle("secandary_navbar_active");
});

window.addEventListener("scroll", function () {
  const secondaryNavbar = document.querySelector(".secondaryNavbar");
  let scrollPosition = window.scrollY; // yeh missing tha
  let triggerPoint = window.innerHeight * 0.8; // 101vh

  if (scrollPosition <= triggerPoint) {
    secondaryNavbar.classList.remove("secandary_navbar_active");
  } else {
    secondaryNavbar.classList.add("secandary_navbar_active");
  }
});
function firstdot() {
  const name = (document.getElementById("name").innerHTML = "Osama");
  const img = document.getElementById("img");
  img.src = "Assts/Pics/osam.png";
  const text =
    "Osama Bahi is a talented frontend web developer. He creates responsive and modern user interfaces. With creativity and skill, he makes the web more beautiful.";
  document.getElementById("text").innerHTML= text
  const put = document.getElementById("put");
  put.innerHTML = data; // or use insertAdjacentHTML if you want to append
}

////////////////////////////// tool tips ////////////////////////////
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
tooltipTriggerList.forEach((el) => {
  new bootstrap.Tooltip(el);
});
//////////////////////// princing toogle jss ///////////////////////////
function Annaully() {
  document.getElementById("mon").classList.remove("active");
  document.getElementById("ann").classList.add("active");
  const packges1 =
    ' <span class="currency">₹</span>181<span class="off"> 20% off</span><span class="per-month">Per year</span>';
  const packges2 =
    ' <span class="currency">₹</span>411<span class="off"> 30% off</span><span class="per-month">Per year</span>';
  const packges3 =
    ' <span class="currency">₹</span>594<span class="off"> 50% off</span><span class="per-month">Per year</span>';
  document.getElementById("packge1").innerHTML = packges1;
  document.getElementById("packge2").innerHTML = packges2;
  document.getElementById("packge3").innerHTML = packges3;
}
function month() {
  document.getElementById("mon").classList.add("active");
  document.getElementById("ann").classList.remove("active");
}
/////////////////////////////// Teams Fuction ///////////////////////////////
// Load reviews from localStorage or use initialReviews
    const initialReviews = [
  {
    id: 1,
    name: "Emily Carter",
    email: "emily.carter@example.com",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
    text: "Master Chef AI completely changed the way I cook! I just type the ingredients I have at home, and it instantly gives me creative recipes. The step-by-step instructions feel like a real chef guiding me in the kitchen. Highly recommended!",
    date: "2025-09-26",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    rating: 4,
    text: "I loved the personalized recipe suggestions. The AI even suggested healthier alternatives for my favorite dishes. Only thing missing is more Indian regional recipes, but I’m sure that will be added soon!",
    date: "2025-09-24",
  },
  {
    id: 3,
    name: "Sophia Lee",
    email: "sophia.lee@example.com",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "As a busy professional, I don’t have much time to plan meals. Master Chef AI makes it so simple—quick recipes, clear instructions, and even nutrition details. It feels like having a personal chef at home.",
    date: "2025-09-20",
  },
];


let reviews = JSON.parse(localStorage.getItem("reviews")) || initialReviews;
let currentReviewIndex = 0;

// save reviews in localStorage
function saveReviews() {
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

// stars
function generateStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars +=
      i <= rating
        ? '<i class="fas fa-star"></i>'
        : '<i class="far fa-star"></i>';
  }
  return stars;
}

// date formatting
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// render reviews
function renderReviews() {
  const slider = document.querySelector(".reviews-slider");
  const dotsContainer = document.querySelector(".slider-dots");

  slider.innerHTML = "";
  dotsContainer.innerHTML = "";

  reviews.forEach((review, index) => {
    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";

    // active/previous classes for animation
    if (index === currentReviewIndex) {
      reviewCard.classList.add("active");
    } else if (index === currentReviewIndex - 1) {
      reviewCard.classList.add("previous");
    }

    let avatarHTML = review.avatar
      ? `<img src="${review.avatar}" alt="${review.name}" class="user-avatar">`
      : `<div class="default-avatar"><i class="fas fa-user"></i></div>`;

    reviewCard.innerHTML = `
      <div class="review-header">
        ${avatarHTML}
        <div class="user-info">
          <div class="user-name">${review.name}</div>
          <div class="review-date">${formatDate(review.date)}</div>
        </div>
      </div>
      <div class="stars">${generateStars(review.rating)}</div>
      <div class="review-text">${review.text}</div>
    `;
    slider.appendChild(reviewCard);

    // dots
    const dot = document.createElement("div");
    dot.className = `dot ${index === currentReviewIndex ? "active" : ""}`;
    dot.addEventListener("click", () => goToReview(index));
    dotsContainer.appendChild(dot);
  });
}

// navigation
function goToReview(index) {
  if (index < 0) index = reviews.length - 1;
  if (index >= reviews.length) index = 0;
  currentReviewIndex = index;
  renderReviews();
}

// add review with optional image
function addReview(reviewData, imageFile) {
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      saveAndAddReview(reviewData, e.target.result);
    };
    reader.readAsDataURL(imageFile);
  } else {
    saveAndAddReview(reviewData, null);
  }
}

function saveAndAddReview(reviewData, avatar) {
  const newReview = {
    id: reviews.length + 1,
    name: reviewData.name,
    avatar: avatar,
    rating: parseInt(reviewData.rating),
    text: reviewData.text,
    date: new Date().toISOString().split("T")[0],
  };
  reviews.unshift(newReview);
  currentReviewIndex = 0;
  saveReviews();
  renderReviews();
  closePopupForm();
  alert("Thank you for your review!");
}

// popup handling
function openPopupForm() {
  document.getElementById("popupOverlay").classList.add("active");
}

function closePopupForm() {
  document.getElementById("popupOverlay").classList.remove("active");
  document.getElementById("reviewForm").reset();
}

// init
document.addEventListener("DOMContentLoaded", () => {
  renderReviews();

  document
    .querySelector(".prev-btn")
    .addEventListener("click", () => goToReview(currentReviewIndex - 1));

  document
    .querySelector(".next-btn")
    .addEventListener("click", () => goToReview(currentReviewIndex + 1));

  document.getElementById("openPopup").addEventListener("click", openPopupForm);
  document.getElementById("closePopup").addEventListener("click", closePopupForm);

  document.getElementById("reviewForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const reviewData = {
      name: document.getElementById("userName").value,
      email: document.getElementById("userEmail").value,
      rating: document.querySelector('input[name="rating"]:checked')?.value,
      text: document.getElementById("reviewText").value,
    };
    if (!reviewData.rating) {
      alert("Please select a rating");
      return;
    }
    const imageFile = document.getElementById("userImage").files[0];
    addReview(reviewData, imageFile);
  });

  document.getElementById("popupOverlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("popupOverlay")) {
      closePopupForm();
    }
  });

  // auto-slide every 5s
  setInterval(() => goToReview(currentReviewIndex + 1), 5000);
});
/////////////////////// FAQS JS//////////////////////////////////////
document.querySelectorAll(".faq-item").forEach(item => {
      const btn = item.querySelector(".icon-btn");
      const answer = item.querySelector(".answer");
      const icon = btn.querySelector("i");

      btn.addEventListener("click", () => {
        item.classList.toggle("active");
        icon.classList.toggle("fa-plus");
        icon.classList.toggle("fa-minus");
      });

      item.querySelector(".question").addEventListener("click", () => {
        btn.click();
      });
    });
    ////////////////// Furtes JS///////////////////
    function FeatureFAQS(element) {
  // sab faqs ke text aur icons le lo
  const allFaqs = document.querySelectorAll(".fs-feature-heading");

  // sabko close karo
  allFaqs.forEach(faq => {
    const text = faq.querySelector(".feature-text");
    const icon = faq.querySelector(".fs-feature-icons");
    text.classList.remove("active");
    icon.classList.remove("bi-chevron-up");
    icon.classList.add("bi-chevron-down");
  });

  // jis pe click hua sirf usko toggle karo
  const parent = element.closest(".fs-feature-heading");
  const text = parent.querySelector(".feature-text");
  const icon = parent.querySelector(".fs-feature-icons");

  text.classList.toggle("active");
  icon.classList.toggle("bi-chevron-down");
  icon.classList.toggle("bi-chevron-up");
}
function faq1(imgPath) {
  const img = document.querySelector(".a");

  // animation remove kro pehle
  img.classList.remove("show");

  // image change hone ke liye thoda delay do
  setTimeout(() => {
    img.src = imgPath;
    img.classList.add("show");
  }, 100); // 0.1 sec delay
}
// ..................................... MOBILE VEIW JS ......................................//
const burger = document.getElementById("burger");
const mobMenu = document.getElementById("mobMenu");
const closeBtn = document.getElementById("closeBtn");

burger.addEventListener("click", () => {
  mobMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  mobMenu.classList.remove("active");
});




