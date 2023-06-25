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
// import { cardArr } from "./slider.js";

const PAGINATION_SLIDERS_CONTAINER = document.querySelector(".slider_pets");
const PAGINATION_BUTTONS = document.querySelectorAll(".pagination__buttons");

let numberOfPages = 6;
let cardOnPage = 8;
let parts = 3;
let paginationArrayOfCards = new Array();
let currentPage = 1;

let cardArr = DATA_WITH_ID.map((card) => new Card(card));

function createArrayOfCards() {
  let tempArr = [];

  for (let i = 0; i < cardOnPage; i += 3) {
    tempArr.push(cardArr.slice(i, i + parts));
  }

  function mixArray(array) {
    return array.sort((a, b) => 0.5 - Math.random());
  }

  for (let i = 0; i < numberOfPages; i += 1) {
    let element = tempArr.map((el) => mixArray(el));

    if (element[i] === element[i + 1]) {
      element = mixArray(element);
    }
    paginationArrayOfCards.push(element.flat());
  }
  return paginationArrayOfCards;
}

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
    currentPage = 6;
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
      currentPage === 6
    ) {
      lastPageShown(paginationArrayOfCards);
      currentPage = 6;
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

function lastPageShown(array, pageNumber = 6) {
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
  createArrayOfCards();
  showPictures(paginationArrayOfCards, currentPage);
  disableButtons(ButtonDoublePrev);
  disableButtons(ButtonPrev);
}
initPagination();
