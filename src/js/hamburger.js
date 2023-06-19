const burger = document.querySelector(".header__hamburger");
const burgerLightLine = document.querySelector(".hamburger-line_light");
const burgerLight = document.querySelector(".header__hamburger_light");
const menu = document.querySelector(".menu-list");
const overlay = document.querySelector(".overlay");
const links = document.querySelectorAll(".menu-list__link");

const openMenu = function () {
  burger.classList.add("header__hamburger_active");
  //   change color of burger
  if (
    burger.classList.contains("header__hamburger_light") &&
    burger.classList.contains("header__hamburger_active")
  ) {
    burger.classList.remove("header__hamburger_light");
    burger.classList.add("header__hamburger_dark-for-light");
    burger.classList.add("header__hamburger_dark");
    burgerLightLine.classList.remove("hamburger-line_light");
    burgerLightLine.classList.add("hamburger-line_dark");
  }
  document.body.classList.add("lock");
  menu.classList.add("menu-list_active");
  overlay.classList.remove("hidden");
};

const closeMenu = function () {
  burger.classList.remove("header__hamburger_active");
  document.body.classList.remove("lock");
  menu.classList.remove("menu-list_active");
  overlay.classList.add("hidden");
  if (burger.classList.contains("header__hamburger_dark-for-light")) {
    burger.classList.remove("header__hamburger_dark-for-light");
    burger.classList.remove("header__hamburger_dark");
    burger.classList.add("header__hamburger_light");
    burgerLightLine.classList.add("hamburger-line_light");
    burgerLightLine.classList.remove("hamburger-line_dark");
  }
};
burger.addEventListener("click", function () {
  if (menu.classList.contains("menu-list_active")) {
    closeMenu();
  } else {
    openMenu();
  }
});

links.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

overlay.addEventListener("click", closeMenu);
