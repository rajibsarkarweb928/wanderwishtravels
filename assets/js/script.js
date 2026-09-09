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
// ==================== DEPARTURE CALENDAR ====================
function toggleCalendar(event) {
  event.stopPropagation();
  const container = document.getElementById("calendarPopupContainer");
  const depContent = document.getElementById("departureCalendarContent");
  const retContent = document.getElementById("returnCalendarContent");
  if (container.classList.contains("hidden")) {
    // First show the container
    container.classList.remove("hidden");
    depContent.classList.remove("hidden");
    retContent.classList.add("hidden");
  } else {
    // If already open, just show departure and hide return
    depContent.classList.remove("hidden");
    retContent.classList.add("hidden");
    // Container is already open, so do nothing
  }
  // Make sure return is closed
  const retPopup = document.getElementById("return_calendar_popup");
  if (retPopup) retPopup.classList.add("hidden");
}

function selectDate(el, day, monthYear, weekday) {
  const popup = document.getElementById("departureCalendarContent");
  popup.querySelectorAll(".date-cell").forEach((cell) => {
    cell.classList.remove(
      "bg-[#5e2bff]",
      "text-white",
      "rounded-lg",
      "font-bold",
      "shadow-md",
    );
  });
  el.classList.add(
    "bg-[#5e2bff]",
    "text-white",
    "rounded-lg",
    "font-bold",
    "shadow-md",
  );
  document.getElementById("dep_day_display").textContent = day;
  document.getElementById("dep_month_display").textContent = monthYear;
  document.getElementById("dep_weekday_display").textContent = weekday;
  document.getElementById("calendarPopupContainer").classList.add("hidden");
}

// ==================== RETURN CALENDAR ====================
function toggleReturnCalendar(event) {
  event.stopPropagation();
  const container = document.getElementById("calendarPopupContainer");
  const depContent = document.getElementById("departureCalendarContent");
  const retContent = document.getElementById("returnCalendarContent");
  if (container.classList.contains("hidden")) {
    container.classList.remove("hidden");
    retContent.classList.remove("hidden");
    depContent.classList.add("hidden");
  } else {
    retContent.classList.remove("hidden");
    depContent.classList.add("hidden");
  }
}

function selectReturnDate(el, day, monthYear, weekday) {
  const popup = document.getElementById("returnCalendarContent");
  popup.querySelectorAll(".date-cell").forEach((cell) => {
    cell.classList.remove(
      "bg-[#5e2bff]",
      "text-white",
      "rounded-lg",
      "font-bold",
      "shadow-md",
    );
  });
  el.classList.add(
    "bg-[#5e2bff]",
    "text-white",
    "rounded-lg",
    "font-bold",
    "shadow-md",
  );
  document.getElementById("return_day_display").textContent = day;
  document.getElementById("return_month_display").textContent = monthYear;
  document.getElementById("return_weekday_display").textContent = weekday;
  document.getElementById("calendarPopupContainer").classList.add("hidden");
}

// Close when clicking outside
window.addEventListener("click", function (e) {
  const container = document.getElementById("calendarPopupContainer");
  const searchBox = document.getElementById("searchBox");
  // Close if the click is outside the search box
  if (!searchBox.contains(e.target)) {
    container.classList.add("hidden");
  }
});

// ==================== TRAVELER COUNTER ====================
function changeCount(e, type, delta) {
  e.stopPropagation();
  const span = document.getElementById("cnt_" + type);
  let val = parseInt(span.textContent) + delta;
  if (val < 0) val = 0;
  span.textContent = val;
  updateTotal();
}

function updateTotal() {
  const adults = parseInt(document.getElementById("cnt_adults").textContent);
  const children = parseInt(
    document.getElementById("cnt_children").textContent,
  );
  document.getElementById("traveller_count_display").textContent =
    adults + children;
}

function applySelection() {
  document.querySelector(".group").classList.remove("hover:bg-slate-50");
}

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
