import { createElement } from "./createElement.js";
import { currentPage } from "./pagination.js";

const PAGINATION_CONTAINER = document.querySelector(".our-friends__block");
const TEXT_BUTTON_DOUBLE_PREV = "<<";
const TEXT_BUTTON_DOUBLE_NEXT = ">>";
// const TEXT_BUTTON_CURRENT = currentPage;
const TEXT_BUTTON_PREV = "<";
const TEXT_BUTTON_NEXT = ">";

let ButtonDoublePrev = null;
let ButtonPrev = null;
let ButtonCurrent = null;
let ButtonNext = null;
let ButtonDoubleNext = null;
let paginationButtonsContainer = null;

function createPaginationButtons() {
  paginationButtonsContainer = createElement("div", "our-friends__pagination");

  ButtonDoublePrev = createElement("button", "pagination__buttons");

  ButtonDoublePrev.classList.add(
    "button",
    "buttons__btn-slider",
    "pagination__buttons_double-prev"
  );

  ButtonDoublePrev.textContent = TEXT_BUTTON_DOUBLE_PREV;

  ButtonPrev = createElement("button", "pagination__buttons");
  ButtonPrev.classList.add(
    "button",
    "buttons__btn-slider",
    "pagination__buttons_prev"
  );
  ButtonPrev.textContent = TEXT_BUTTON_PREV;

  ButtonCurrent = createElement("button", "pagination__buttons");
  ButtonCurrent.classList.add(
    "button",
    "buttons__btn-slider",
    "pagination__buttons_current"
  );
  ButtonCurrent.textContent = 1;

  ButtonNext = createElement("button", "pagination__buttons");
  ButtonNext.classList.add(
    "button",
    "buttons__btn-slider",
    "pagination__buttons_next"
  );
  ButtonNext.textContent = TEXT_BUTTON_NEXT;

  ButtonDoubleNext = createElement("button", "pagination__buttons");
  ButtonDoubleNext.classList.add(
    "button",
    "buttons__btn-slider",
    "pagination__buttons_double-next"
  );
  ButtonDoubleNext.textContent = TEXT_BUTTON_DOUBLE_NEXT;

  PAGINATION_CONTAINER.append(paginationButtonsContainer);

  paginationButtonsContainer.append(ButtonDoublePrev);
  paginationButtonsContainer.append(ButtonPrev);
  paginationButtonsContainer.append(ButtonCurrent);
  paginationButtonsContainer.append(ButtonNext);
  paginationButtonsContainer.append(ButtonDoubleNext);
  // return (
  //   ButtonCurrent,
  //   ButtonDoubleNext,
  //   ButtonDoublePrev,
  //   ButtonNext,
  //   ButtonPrev,
  //   paginationButtonsContainer
  // );
}
createPaginationButtons();

export {
  paginationButtonsContainer,
  createPaginationButtons,
  ButtonCurrent,
  ButtonDoubleNext,
  ButtonDoublePrev,
  ButtonNext,
  ButtonPrev,
  PAGINATION_CONTAINER,
};
