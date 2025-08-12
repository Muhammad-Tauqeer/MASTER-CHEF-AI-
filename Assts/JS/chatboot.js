function navbar() {
  const nav = document.getElementById("navbar");

  if (nav.style.width === "15%") {
    // Close
    nav.style.width = "83px";
  } else {
    // Open
    nav.style.width = "15%";
  }
}

