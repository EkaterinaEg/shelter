"use strict";
import { DATA_WITH_ID } from "./data.js";
import { Card } from "./card.js";
import {
  ButtonCurrent,
  ButtonDoubleNext,
  ButtonDoublePrev,
  ButtonNext,
  ButtonPrev,
} from "./paginationButtons.js";
import { numberOfCards } from "./media.js";
// import { cardArr } from "./slider.js";

const PAGINATION_SLIDERS_CONTAINER = document.querySelector(".slider_pets");
const PAGINATION_BUTTONS = document.querySelectorAll(".pagination__buttons");

let numberOfPages = null;
let cardOnPage = null;
let parts = null;

let paginationArrayOfCards = new Array();
let currentPage = 1;

let cardArr = DATA_WITH_ID.map((card) => new Card(card));

cardArr = mixArray(cardArr);

function mixArray(array) {
  return array.sort((a, b) => 0.5 - Math.random());
}

function checkScreenPagination() {
  currentPage = 1;
  const pageWidth = document.documentElement.scrollWidth;

  if (pageWidth >= 1280) {
    numberOfPages = 6;
    cardOnPage = 8;
    parts = 3;
  } else if (pageWidth <= 767.9) {
    numberOfPages = 16;
    cardOnPage = 3;
    parts = 1;
  } else {
    numberOfPages = 8;
    cardOnPage = 6;
    parts = 2;
  }
  console.log(pageWidth);
  // console.log(numberOfPages);
  // console.log(cardOnPage);
  createArrayOfCards();
}
// checkScreenPagination();

function createArrayOfCards() {
  let tempArr = [];
  let arrayOfAllCards = [];
  // console.log(numberOfPages);
  // console.log(cardOnPage);
  for (let i = 0; i < cardArr.length; i += 3) {
    tempArr.push(cardArr.slice(i, i + 3)); //create array of arrays for parts
  }

  for (let i = 0; i < 6; i += 1) {
    let element = tempArr.map((el) => mixArray(el));
    // if ((element[i] = element[i + 1])) {
    //   tempArr.map((el) => mixArray(el));
    // }
    arrayOfAllCards.push(element.flat());
  }
  arrayOfAllCards = arrayOfAllCards.flat(); // array of 48 cards
  // console.log(arrayOfAllCards);
  paginationArrayOfCards.length = 0;
  for (let i = 0; i < arrayOfAllCards.length; i += cardOnPage) {
    let element = arrayOfAllCards.slice(i, i + cardOnPage);

    paginationArrayOfCards.push(element);
  }
  return paginationArrayOfCards; // array of array with certain number od cards
}

// console.log(paginationArrayOfCards);

//show cards based on pageNumber
function showPictures(data, pageNumber) {
  PAGINATION_SLIDERS_CONTAINER.innerHTML = "";
  data[pageNumber - 1].forEach((card) =>
    PAGINATION_SLIDERS_CONTAINER.append(card.generateCard())
  );
}

for (let button of PAGINATION_BUTTONS) {
  button.addEventListener("click", paginationClickHandler);
}

function paginationClickHandler(e) {
  if (e.target.classList.contains("pagination__buttons_double-prev")) {
    firstPageShown(paginationArrayOfCards);
    currentPage = 1;
  } else if (e.target.classList.contains("pagination__buttons_double-next")) {
    lastPageShown(paginationArrayOfCards);
    currentPage = numberOfPages;
  } else {
    PAGINATION_BUTTONS.forEach((button) => enableButtons(button));
    if (
      e.target.classList.contains("pagination__buttons_next") && //1,2,3,4,5
      currentPage < numberOfPages &&
      currentPage >= 1
    ) {
      currentPage += 1;
      showPictures(paginationArrayOfCards, currentPage);
      ButtonCurrent.textContent = currentPage;
    }
    if (
      e.target.classList.contains("pagination__buttons_next") &&
      currentPage === numberOfPages
    ) {
      lastPageShown(paginationArrayOfCards);
      currentPage = numberOfPages;
    }

    if (
      e.target.classList.contains("pagination__buttons_prev") && //2,3,4,5,6
      currentPage > 1 &&
      currentPage <= numberOfPages
    ) {
      currentPage -= 1;
      showPictures(paginationArrayOfCards, currentPage);
      ButtonCurrent.textContent = currentPage;
    }
    if (
      e.target.classList.contains("pagination__buttons_prev") &&
      currentPage === 1
    ) {
      firstPageShown(paginationArrayOfCards);
      currentPage = 1;
    }
  }
}

function firstPageShown(array, pageNumber = 1) {
  showPictures(array, pageNumber);
  ButtonCurrent.textContent = pageNumber;
  enableButtons(ButtonNext);
  enableButtons(ButtonDoubleNext);
  disableButtons(ButtonPrev);
  disableButtons(ButtonDoublePrev);
}

function lastPageShown(array, pageNumber = numberOfPages) {
  showPictures(array, pageNumber);
  ButtonCurrent.textContent = pageNumber;
  enableButtons(ButtonPrev);
  enableButtons(ButtonDoublePrev);
  disableButtons(ButtonNext);
  disableButtons(ButtonDoubleNext);
}
function disableButtons(button) {
  button.setAttribute("disabled", true);
  button.classList.add("button_disabled");
}
function enableButtons(button) {
  button.removeAttribute("disabled");
  button.classList.remove("button_disabled");
}
function initPagination() {
  checkScreenPagination();
  firstPageShown(paginationArrayOfCards, 1);
  createArrayOfCards();
  showPictures(paginationArrayOfCards, currentPage);
  disableButtons(ButtonDoublePrev);
  disableButtons(ButtonPrev);
}
// initPagination();

export {
  initPagination,
  checkScreenPagination,
  paginationArrayOfCards,
  currentPage,
  showPictures,
};
