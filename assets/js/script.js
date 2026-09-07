document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlTag = document.getElementById("html-tag");

  // Saved theme apply
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
