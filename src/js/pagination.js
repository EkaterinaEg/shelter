import { cardArr } from "./slider.js";
import {
  ButtonCurrent,
  ButtonDoubleNext,
  ButtonDoublePrev,
  ButtonNext,
  ButtonPrev,
  PAGINATION_CONTAINER,
  paginationButtonsContainer,
} from "./paginationButtons.js";

const PAGINATION_SLIDERS_CONTAINER = document.querySelector(".slider_pets");
const PAGINATION_BUTTONS = document.querySelectorAll(".pagination__buttons");

let numberOfPages = 6;
let cardOnPage = 8;
let parts = 3;
let finalArray = [];
let currentPage = 1;
disableButtons(ButtonDoublePrev);
disableButtons(ButtonPrev);

function createArrayOfCards() {
  let newArr = [];

  for (let i = 0; i < cardOnPage; i += 3) {
    newArr.push(cardArr.slice(i, i + parts));
  }
  function mixArray(array) {
    for (let i = 0; i < array.length; i += 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  for (let i = 0; i < 6; i += 1) {
    let element = newArr.map((el) => mixArray(el));
    finalArray.push(element.flat());
  }
  return finalArray;
}
//show cards based on pageNumber
function showPictures(data, pageNumber) {
  for (let i = 0; i < data.length; i++) {
    data[pageNumber - 1].forEach((card) =>
      PAGINATION_SLIDERS_CONTAINER.append(card)
    );
  }
}

for (let button of PAGINATION_BUTTONS) {
  button.addEventListener("click", uploadCards);
}

function uploadCards(e) {
  if (e.target.classList.contains("pagination__buttons_double-prev")) {
    showPictures(finalArray, 1);
    ButtonCurrent.textContent = 1;
    currentPage = 1;
    disableButtons(ButtonPrev);
    disableButtons(ButtonDoublePrev);
    enableButtons(ButtonNext);
    enableButtons(ButtonDoubleNext);
  } else if (e.target.classList.contains("pagination__buttons_double-next")) {
    showPictures(finalArray, numberOfPages);
    ButtonCurrent.textContent = numberOfPages;
    currentPage = numberOfPages;
    disableButtons(ButtonNext);
    disableButtons(ButtonDoubleNext);
    enableButtons(ButtonPrev);
    enableButtons(ButtonDoublePrev);
  } else {
    if (
      e.target.classList.contains("pagination__buttons_next") &&
      currentPage < numberOfPages &&
      currentPage >= 1
    ) {
      //1,2,3,4,5

      PAGINATION_BUTTONS.forEach((button) => enableButtons(button));
      currentPage += 1;
      showPictures(finalArray, currentPage);
      ButtonCurrent.textContent = currentPage;
    }
    if (
      e.target.classList.contains("pagination__buttons_next") &&
      currentPage === 6
    ) {
      PAGINATION_BUTTONS.forEach((button) => enableButtons(button));
      showPictures(finalArray, currentPage);
      ButtonCurrent.textContent = currentPage;
      disableButtons(ButtonNext);
      disableButtons(ButtonDoubleNext);
      enableButtons(ButtonPrev);
      enableButtons(ButtonDoublePrev);
    }

    if (
      e.target.classList.contains("pagination__buttons_prev") &&
      currentPage > 1 &&
      currentPage <= numberOfPages
    ) {
      //2,3,4,5,6

      currentPage -= 1;
      showPictures(finalArray, currentPage);
      ButtonCurrent.textContent = currentPage;
      PAGINATION_BUTTONS.forEach((button) => enableButtons(button));
    }
    if (
      e.target.classList.contains("pagination__buttons_prev") &&
      currentPage === 1
    ) {
      PAGINATION_BUTTONS.forEach((button) => enableButtons(button));

      showPictures(finalArray, currentPage);
      ButtonCurrent.textContent = currentPage;
      enableButtons(ButtonNext);
      enableButtons(ButtonDoubleNext);
      disableButtons(ButtonPrev);
      disableButtons(ButtonDoublePrev);
    }
    // if (
    //   e.target.classList.contains("pagination__buttons_next") &&
    //   currentPage === 1
    // ) {
    //   currentPage += 1;
    //   showPictures(finalArray, currentPage);
    //   ButtonCurrent.textContent = currentPage;
    //   disableButtons(ButtonPrev);
    //   disableButtons(ButtonDoublePrev);
    //   enableButtons(ButtonNext);
    //   enableButtons(ButtonDoubleNex);
    // }
  }
}
function disableButtons(button) {
  button.setAttribute("disabled", true);
  button.classList.add("button_disabled");
}
function enableButtons(button) {
  button.removeAttribute("disabled");
  button.classList.remove("button_disabled");
}
export {
  numberOfPages,
  finalArray,
  createArrayOfCards,
  showPictures,
  currentPage,
  uploadCards,
};
