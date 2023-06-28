"use strict";

import { cardArr, index, checkScreenSlider } from "./slider.js";

import {
  checkScreenPagination,
  paginationArrayOfCards,
  currentPage,
  showPictures,
  initPagination,
} from "./pagination.js";
let numberOfCards;

const checkTablet = window.matchMedia("(max-width: 767.9px)"); //1 card
const checkLaptop = window.matchMedia("(max-width: 1279px)"); //2 cards
const checkDesktop = window.matchMedia("(min-width: 1280px)"); //3 cards

function mediaClickHandler(e) {
  if (e.matches) {
    // checkScreenSlider(cardArr, index);
    initPagination();
  }
}

checkDesktop.addEventListener("change", mediaClickHandler);
checkLaptop.addEventListener("change", mediaClickHandler);
checkTablet.addEventListener("change", mediaClickHandler);

export { numberOfCards };
