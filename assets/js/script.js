document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // ===== Theme Toggle Logic =====
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlTag = document.documentElement;

  if (localStorage.getItem("theme") === "dark") {
    htmlTag.classList.add("dark");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      htmlTag.classList.toggle("dark");
      const isDark = htmlTag.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // ===== Mobile Navbar Toggle Logic =====
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      if (menuIcon) menuIcon.classList.toggle("hidden");
      if (closeIcon) closeIcon.classList.toggle("hidden");
    });
  }

  // ===== Mobile Country Modal Logic =====
  const openBtn = document.getElementById("openCountryModal");
  const closeBtn = document.getElementById("closeCountryModal");
  const applyBtn = document.getElementById("applyCountryModal");
  const modal = document.getElementById("countryModal");

  const closeModal = () => modal && modal.classList.add("hidden");

  if (openBtn && modal) {
    openBtn.addEventListener("click", (e) => {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        modal.classList.remove("hidden");
      }
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (applyBtn) applyBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // ===== Tab Switching Logic (Country / Currency / Language) =====
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = {
    country: document.getElementById("countryContent"),
    currency: document.getElementById("currencyContent"),
    language: document.getElementById("languageContent"),
  };

  function switchTab(tabId) {
    // Hide all contents
    Object.values(tabContents).forEach((content) => {
      if (content) content.style.display = "none";
    });

    // Show selected content
    if (tabContents[tabId]) {
      tabContents[tabId].style.display = "block";
    }

    // Update active button state
    tabButtons.forEach((btn) => {
      const isActive = btn.dataset.tab === tabId;
      btn.classList.toggle("active", isActive);
      btn.classList.toggle("bg-[#1890ff]", isActive);
      btn.classList.toggle("text-white", isActive);
      btn.classList.toggle("shadow-sm", isActive);
      btn.classList.toggle("text-gray-600", !isActive);
      btn.classList.toggle("dark:text-gray-300", !isActive);
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.tab) switchTab(btn.dataset.tab);
    });
  });

  // Default active tab
  switchTab("country");
});
// hero section js start
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const totalSlides = slides.length;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.remove("hidden");
      slide.classList.add("block");
    } else {
      slide.classList.remove("block");
      slide.classList.add("hidden");
    }
  });

  dots.forEach((dot, i) => {
    const innerCircle = dot.querySelector("span");
    if (i === index) {
      dot.className =
        "dot w-4 h-4 rounded-full border-2 border-[#009a9a] flex items-center justify-center cursor-pointer focus:outline-none";
      innerCircle.className = "w-2 h-2 bg-[#009a9a] rounded-full";
    } else {
      dot.className =
        "dot w-3.5 h-3.5 rounded-full border-2 border-white/80 cursor-pointer focus:outline-none";
      innerCircle.className = "w-2 h-2 bg-transparent rounded-full";
    }
  });

  currentSlide = index;
}

function nextSlide() {
  let next = (currentSlide + 1) % totalSlides;
  showSlide(next);
}

function goToSlide(index) {
  showSlide(index);
  resetTimer();
}

function startTimer() {
  slideInterval = setInterval(nextSlide, 3000);
}

function resetTimer() {
  clearInterval(slideInterval);
  startTimer();
}

startTimer();
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
