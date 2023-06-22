"use strict";
import { DATA_WITH_ID } from "./js/data.js";
import "./js/hamburger.js";
import { Modal } from "./js/modal.js";
import { fillblocks, CARD_CONTAINER } from "./js/slider.js";
// import "./js/sliderButtons.js";
import {
  createArrayOfCards,
  showPictures,
  finalArray,
  currentPage,
  uploadCards,
} from "./js/pagination.js";

// import { initial, numberOfPages } from "./js/pagination.js";

window.onload = function () {
  // fillblocks(); //create blocks with cards
  // addCardClickHandler(); //popup
  createArrayOfCards(); //test
  showPictures(finalArray, currentPage);
};
console.log(finalArray);
// _______________________________________
// create popup

const addCardClickHandler = () => {
  CARD_CONTAINER.addEventListener("click", (e) => {
    if (e.target.closest(".slider__card")) {
      let clickedCardId = e.target
        .closest(".slider__card")
        .getAttribute("data-id");
      let clickedPopupData = getClickedData(clickedCardId);

      //   console.log(clickedPopupData);
      renderElementModal(clickedPopupData);
    }
  });
};
const getClickedData = (id) => {
  return DATA_WITH_ID.find((popup) => popup.id == id);
};

const renderElementModal = (el) => {
  let popup = new Modal("popup", el);
  //   console.log(popup);
  popup.renderPopup();
};
// _____________________________________________pagination
