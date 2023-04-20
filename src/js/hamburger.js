const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".navigation");

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle("hamburger_close");
  nav.classList.toggle("navigation_phone");
})