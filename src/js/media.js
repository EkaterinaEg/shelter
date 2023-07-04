"use strict";

const checkTablet = window.matchMedia("(max-width: 767.9px)"); //1 card
const checkLaptop = window.matchMedia(
  "(min-width: 768px) and (max-width: 1279px)"
); //2 cards
const checkDesktop = window.matchMedia("(min-width: 1280px)"); //3 cards

function mediaClickHandlerhandler(
  smallScreenFunction,
  mediumScreenFunction,
  largeScreenFunction
) {
  checkDesktop.addEventListener("change", largeScreenFunction);
  checkLaptop.addEventListener("change", mediumScreenFunction);
  checkTablet.addEventListener("change", smallScreenFunction);
}

export { mediaClickHandlerhandler };
