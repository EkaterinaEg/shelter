"use strict";

const BURGER = document.querySelector(".header__hamburger");
const BURGER_LINE_LIGHT = document.querySelector(".hamburger-line_light");
const MENU = document.querySelector(".menu-list");
const OVERLAY = document.querySelector(".overlay");
const LINKS = document.querySelectorAll(".menu-list__link");

const openMenu = function () {
  BURGER.classList.add("header__hamburger_active");
  //   change color of BURGER
  if (
    BURGER.classList.contains("header__hamburger_light") &&
    BURGER.classList.contains("header__hamburger_active")
  ) {
    BURGER.classList.remove("header__hamburger_light");
    BURGER.classList.add("header__hamburger_dark-for-light");
    BURGER.classList.add("header__hamburger_dark");
    BURGER_LINE_LIGHT.classList.remove("hamburger-line_light");
    BURGER_LINE_LIGHT.classList.add("hamburger-line_dark");
  }
  document.body.classList.add("lock");
  MENU.classList.add("menu-list_active");
  OVERLAY.classList.remove("hidden");
};

const closeMenu = function () {
  BURGER.classList.remove("header__hamburger_active");
  document.body.classList.remove("lock");
  MENU.classList.remove("menu-list_active");
  OVERLAY.classList.add("hidden");
  if (BURGER.classList.contains("header__hamburger_dark-for-light")) {
    BURGER.classList.remove("header__hamburger_dark-for-light");
    BURGER.classList.remove("header__hamburger_dark");
    BURGER.classList.add("header__hamburger_light");
    BURGER_LINE_LIGHT.classList.add("hamburger-line_light");
    BURGER_LINE_LIGHT.classList.remove("hamburger-line_dark");
  }
};
BURGER.addEventListener("click", function () {
  if (MENU.classList.contains("menu-list_active")) {
    closeMenu();
  } else {
    openMenu();
  }
});

LINKS.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

OVERLAY.addEventListener("click", closeMenu);
