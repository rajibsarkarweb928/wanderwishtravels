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
function toggleCalendar(event) {
  event.stopPropagation();
  const popup = document.getElementById("custom_calendar_popup");
  popup.classList.toggle("hidden");
}

function selectDate(day, monthYear, weekday) {
  document.getElementById("dep_day_display").innerText = day;
  document.getElementById("dep_month_display").innerText = monthYear;
  document.getElementById("dep_weekday_display").innerText = weekday;

  // Update hidden input if needed
  // document.getElementById('departure_input').value = ...

  document.getElementById("custom_calendar_popup").classList.add("hidden");
}

document.addEventListener("click", function (event) {
  const popup = document.getElementById("custom_calendar_popup");
  if (popup && !popup.classList.contains("hidden")) {
    popup.classList.add("hidden");
  }
});
// hero section js end
