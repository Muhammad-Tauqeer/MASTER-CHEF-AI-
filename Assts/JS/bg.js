window.onload = function () {
  const container = document.querySelector(".bg_container");
  const images = container.querySelectorAll("img");

  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;

  const imageSize = 80;
  const columns = Math.floor(containerWidth / imageSize);
  const rows = Math.floor(containerHeight / imageSize);

  let usedPositions = [];

  function getRandomPosition() {
    let x, y, key;
    do {
      x = Math.floor(Math.random() * columns);
      y = Math.floor(Math.random() * rows);
      key = `${x},${y}`;
    } while (usedPositions.includes(key));
    usedPositions.push(key);
    return { x: x * imageSize, y: y * imageSize };
  }

  function placeImagesInitially() {
    images.forEach((img) => {
      const { x, y } = getRandomPosition();
      img.style.left = x + "px";
      img.style.top = y + "px";
      img.style.width = imageSize - 5 + "px";
      img.style.height = imageSize - 5 + "px";

      img.ondragstart = () => false; // ✅ Prevent browser default image drag
    });
  }

  function animateImages() {
    return setInterval(() => {
      usedPositions = [];
      images.forEach((img) => {
        const { x, y } = getRandomPosition();
        img.style.left = x + "px";
        img.style.top = y + "px";
      });
    }, 5000);
  }

  // ✅ Drag setup
  let currentDrag = null;
  let offsetX = 0;
  let offsetY = 0;
  let animationInterval = null;

  images.forEach((img) => {
    img.addEventListener("mousedown", (e) => {
      currentDrag = img;
      currentDrag.classList.add("dragging");
      clearInterval(animationInterval);

      offsetX = e.clientX - img.offsetLeft;
      offsetY = e.clientY - img.offsetTop;

      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", onDrop);
    });
  });

  function onDrag(e) {
    if (currentDrag) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      currentDrag.style.left = x + "px";
      currentDrag.style.top = y + "px";
    }
  }

  function onDrop() {
    if (currentDrag) {
      currentDrag.classList.remove("dragging");

      animationInterval = animateImages(); // ✅ Restart animation
      currentDrag = null;

      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", onDrop);
    }
  }

  // 🟢 Start
  placeImagesInitially();
  animationInterval = animateImages();
};
