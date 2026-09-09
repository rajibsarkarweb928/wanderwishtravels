document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlTag = document.documentElement; // use <html> directly

  // Apply saved theme
  if (localStorage.getItem("theme") === "dark") {
    htmlTag.classList.add("dark");
  }

  // Toggle click event
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      htmlTag.classList.toggle("dark");
      if (htmlTag.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Mobile Country Modal Open/Close Logic
  const openBtn = document.getElementById("openCountryModal");
  const closeBtn = document.getElementById("closeCountryModal");
  const applyBtn = document.getElementById("applyCountryModal");
  const modal = document.getElementById("countryModal");

  if (openBtn && modal) {
    openBtn.addEventListener("click", (e) => {
      // Show modal when clicked on mobile
      if (window.innerWidth < 1024) {
        e.preventDefault();
        modal.classList.remove("hidden");
      }
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  if (applyBtn && modal) {
    applyBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  // Close modal when clicking on the background
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }

  // ===== Tab switching logic for Country / Currency / Language =====
  const tabButtons = document.querySelectorAll(".tab-btn");
  const countryContent = document.getElementById("countryContent");
  const currencyContent = document.getElementById("currencyContent");
  const languageContent = document.getElementById("languageContent");

  // Function to switch tabs
  function switchTab(tabId) {
    // Hide all content
    if (countryContent) countryContent.style.display = "none";
    if (currencyContent) currencyContent.style.display = "none";
    if (languageContent) languageContent.style.display = "none";

    // Show selected content
    if (tabId === "country" && countryContent) {
      countryContent.style.display = "block";
    } else if (tabId === "currency" && currencyContent) {
      currencyContent.style.display = "block";
    } else if (tabId === "language" && languageContent) {
      languageContent.style.display = "block";
    }

    // Update active class on buttons
    tabButtons.forEach((btn) => {
      btn.classList.remove("active", "bg-[#1890ff]", "text-white", "shadow-sm");
      btn.classList.add("text-gray-600", "dark:text-gray-300");
      if (btn.dataset.tab === tabId) {
        btn.classList.add("active", "bg-[#1890ff]", "text-white", "shadow-sm");
        btn.classList.remove("text-gray-600", "dark:text-gray-300");
      }
    });
  }

  // Add click event to each tab button
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.dataset.tab;
      if (tabId) switchTab(tabId);
    });
  });

  // Set default tab (Country) on load
  switchTab("country");
});
// hero section js start

// hero section js end

// Feature deal Section Start js
const slider = document.getElementById("sliderContainer");
const slideLeft = document.getElementById("slideLeft");
const slideRight = document.getElementById("slideRight");

slideLeft.addEventListener("click", () => {
  slider.scrollBy({ left: -340, behavior: "smooth" });
});

slideRight.addEventListener("click", () => {
  slider.scrollBy({ left: 340, behavior: "smooth" });
});
// Feature deal Section End js
//Offer-Slider-Start
const bannerSlider = document.getElementById("bannerSliderContainer");
const bannerSlideLeft = document.getElementById("bannerSlideLeft");
const bannerSlideRight = document.getElementById("bannerSlideRight");

let autoSlideInterval;

// Auto-slide logic (moved to a reusable function)
const slideNext = () => {
  const { scrollLeft, clientWidth, scrollWidth } = bannerSlider;
  const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
  isAtEnd
    ? bannerSlider.scrollTo({ left: 0, behavior: "smooth" })
    : bannerSlider.scrollBy({ left: clientWidth, behavior: "smooth" });
};

// Start/Stop auto-slide
const startAutoSlide = () => {
  autoSlideInterval = setInterval(slideNext, 4000);
};

const stopAutoSlide = () => {
  clearInterval(autoSlideInterval);
};

// Manual navigation
bannerSlideLeft.addEventListener("click", () => {
  bannerSlider.scrollBy({
    left: -bannerSlider.offsetWidth,
    behavior: "smooth",
  });
});

bannerSlideRight.addEventListener("click", () => {
  bannerSlider.scrollBy({ left: bannerSlider.offsetWidth, behavior: "smooth" });
});

// Auto-slide initialisation & hover controls
startAutoSlide();
bannerSlider.addEventListener("mouseenter", stopAutoSlide);
bannerSlider.addEventListener("mouseleave", startAutoSlide);
//Offer-Slider-End

// Why-us-section-start
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("reviewSlider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (slider && prevBtn && nextBtn) {
    const cardWidth =
      slider.querySelector(".flex-shrink-0")?.offsetWidth || 240;
    const gap = 12;

    nextBtn.addEventListener("click", function () {
      const scrollAmount = cardWidth + gap;
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", function () {
      const scrollAmount = cardWidth + gap;
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }
});
// Why-us-section-end
