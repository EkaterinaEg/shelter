"use strict";
import { DATA_WITH_ID } from "./js/data.js";
import "./js/hamburger.js";
import { Modal } from "./js/modal.js";
import { fillblocks, CARD_CONTAINER } from "./js/slider.js";
import "./js/sliderButtons.js";
// import "./js/paginationButtons.js";
// import "./js/pagination.js";

// import { initial, numberOfPages } from "./js/pagination.js";

window.onload = function () {
  fillblocks(); //create blocks with cards
  addCardClickHandler(); //popup
  // initial(); //test
};

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

// const showcaseElement = Pagination.createComponent(petsJSON);
// const paginationCounter = createPaginationButtons(numberOfPages, Pagination.showPage);
// const paginationComponent = createElement({
//     tagName: 'section',
//     className: CssClasses.CONTAINER,
// });

// paginationComponent.append(showcaseElement, counterComponent);
// document.body.append(paginationComponent);
