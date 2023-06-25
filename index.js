"use strict";
import { DATA_WITH_ID } from "./src/js/data.js";
import "./src/js/hamburger.js";
import { Modal } from "./src/js/modal.js";

window.onload = function () {
  addCardClickHandler(); //popup
};

// _______________________________________
// create popup
const POPUP_CONTAINER = document.querySelector(".our-friends__slider");

const addCardClickHandler = () => {
  POPUP_CONTAINER.addEventListener("click", (e) => {
    if (e.target.closest(".slider__card")) {
      let clickedCardId = e.target
        .closest(".slider__card")
        .getAttribute("data-id");
      let clickedPopupData = getClickedData(clickedCardId);
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
