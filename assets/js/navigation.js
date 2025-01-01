const header = document.getElementById("header");
const mobileMenuTrigger = document.getElementById("mobile-menu-trigger");
const iconElement = mobileMenuTrigger.querySelector("i");

const FA_BARS_CLASS = "fa-bars";
const FA_TIMES_CLASS = "fa-times";
const HEADER_OPENED_CLASS = "header-opened";

mobileMenuTrigger.addEventListener("click", () => {
  if (iconElement.classList.contains(FA_BARS_CLASS)) {
    iconElement.classList.replace(FA_BARS_CLASS, FA_TIMES_CLASS);
    header.classList.add(HEADER_OPENED_CLASS);
  } else {
    iconElement.classList.replace(FA_TIMES_CLASS, FA_BARS_CLASS);
    header.classList.remove(HEADER_OPENED_CLASS);
  }
});
