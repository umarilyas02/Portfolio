// script.js

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const statusEl = document.getElementById("formStatus");

  if (!name || !email || !message) {
    statusEl.textContent = "Please fill out all fields.";
    return;
  }

  statusEl.textContent = "Thanks! I will get back soon 😊";

  // You can later add API form submission here (e.g., EmailJS or Google Sheets)
});
