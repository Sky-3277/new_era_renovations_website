// assets/js/main.js

// --- Mobile Nav Toggle ---
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    mobileMenu.classList.toggle("hidden");
  });
}

// --- Auto Year in Footer ---
const yearEl = document.getElementById("y");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// --- Project Carousel ---
const track = document.getElementById("carouselTrack");
const slides = track ? track.children : [];
let index = 0;

function updateCarousel() {
  if (track) {
    track.style.transform = `translateX(-${index * 100}%)`;
  }
}

// Next/Prev buttons
document.getElementById("nextBtn")?.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateCarousel();
});
document.getElementById("prevBtn")?.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Auto-play every 5s
setInterval(() => {
  index = (index + 1) % slides.length;
  updateCarousel();
}, 5000);

// --- Before/After Slider (optional) ---
// For images wrapped in .before-after with two <img>, adds a draggable slider
document.querySelectorAll(".before-after").forEach((wrapper) => {
  const before = wrapper.querySelector("img:first-child");
  const after = wrapper.querySelector("img:last-child");

  if (before && after) {
    wrapper.style.position = "relative";
    after.style.position = "absolute";
    after.style.top = "0";
    after.style.left = "0";
    after.style.width = "100%";
    after.style.clipPath = "inset(0 50% 0 0)";

    const slider = document.createElement("div");
    slider.className =
      "absolute top-0 bottom-0 w-1 bg-brand cursor-col-resize";
    slider.style.left = "50%";
    wrapper.appendChild(slider);

    let isDragging = false;

    slider.addEventListener("mousedown", () => (isDragging = true));
    slider.addEventListener("touchstart", () => (isDragging = true));

    document.addEventListener("mouseup", () => (isDragging = false));
    document.addEventListener("touchend", () => (isDragging = false));

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const rect = wrapper.getBoundingClientRect();
      let x = e.clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      const percent = (x / rect.width) * 100;
      after.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      slider.style.left = `${percent}%`;
    });

    document.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const rect = wrapper.getBoundingClientRect();
      let x = e.touches[0].clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      const percent = (x / rect.width) * 100;
      after.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      slider.style.left = `${percent}%`;
    });
  }
});

