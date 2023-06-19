import { createElement } from "./createElement.js";

const TEXT_BUTTON_FIRST = "<<";
const TEXT_BUTTON_LAST = ">>";
const TEXT_BUTTON_PREV = "<";
const TEXT_BUTTON_NEXT = ">";

const counterState = {
  countPage: 0,
  currentPage: 1,

  updatePageCount(count) {
    if (typeof count !== "number" || count < 0) {
      throw new TypeError("Pagination error. Count page is invalid.");
    }
    this.countPage = count;
  },
  updateCurrentPage(page, onUpdate) {
    if (typeof page !== "number" || page < 0) {
      throw new TypeError("Pagination error. Current page is invalid.");
    }
    this.currentPage = page;
    onUpdate(page);
  },
  decreaseCurrentPage(onUpdate) {
    this.currentPage -= 1;
    onUpdate(this.currentPage);
  },
  increaseCurrentPage(onUpdate) {
    this.currentPage += 1;
    onUpdate(this.currentPage);
  },
  getCountPage() {
    return this.countPage;
  },
  getCurrentPage() {
    return this.currentPage;
  },
  isFirstPage() {
    return this.currentPage === 1;
  },
  isLastPage() {
    return this.currentPage === this.countPage;
  },
};

const buttonsState = {
  buttonCurrent: createElement({
    tagName: "button",
    className: `pagination__buttons button buttons__btn-slider`,
    textContent: counterState.getCurrentPage(),
  }),
  buttonFirst: createElement({
    tagName: "button",
    className: `pagination__buttons button buttons__btn-slider`,
    textContent: TEXT_BUTTON_FIRST,
    onClickHandler: () => {
      counterState.updateCurrentPage(
        1,
        buttonsState.updateButtonsStatuses.bind(buttonsState)
      );
    },
  }),
  buttonPrev: createElement({
    tagName: "button",
    className: `pagination__buttons button buttons__btn-slider`,
    textContent: TEXT_BUTTON_PREV,
    onClickHandler: () => {
      counterState.decreaseCurrentPage(
        buttonsState.updateButtonsStatuses.bind(buttonsState)
      );
    },
  }),
  buttonNext: createElement({
    tagName: "button",
    className: `pagination__buttons button buttons__btn-slider`,
    textContent: TEXT_BUTTON_NEXT,
    onClickHandler: () => {
      counterState.increaseCurrentPage(
        buttonsState.updateButtonsStatuses.bind(buttonsState)
      );
    },
  }),
  buttonLast: createElement({
    tagName: "button",
    className: `pagination__buttons button buttons__btn-slider`,
    textContent: TEXT_BUTTON_LAST,
    onClickHandler: () => {
      counterState.updateCurrentPage(
        counterState.getCountPage(),
        buttonsState.updateButtonsStatuses.bind(buttonsState)
      );
    },
  }),

  setOnUpdatePageCallback(onUpdate) {
    this.onPageUpdate = onUpdate;
  },

  updateCurrentButtonText(text) {
    this.buttonCurrent.textContent = text.toString();
  },

  updateButtonsStatuses(page) {
    this.updateCurrentButtonText(page);
    toggleButtons(
      [this.buttonLast, this.buttonNext],
      counterState.isLastPage()
    );
    toggleButtons(
      [this.buttonFirst, this.buttonPrev],
      counterState.isFirstPage()
    );
    if (this.onPageUpdate) {
      this.onPageUpdate(page);
    }
  },

  getButtons() {
    return {
      buttonFirst: this.buttonFirst,
      buttonPrev: this.buttonPrev,
      buttonCurrent: this.buttonCurrent,
      buttonNext: this.buttonNext,
      buttonLast: this.buttonLast,
    };
  },
};

function createPaginationButtons(count, onUpdatePage) {
  if (typeof count !== "number" || count < 0) {
    throw new TypeError("Pagination error. Count page is invalid.");
  }
  const paginationButtonsContainer = createElement({
    tagName: "div",
    className: our - friends__pagination,
  });

  paginationButtonsContainer.append(
    ...Object.values(buttonsState.getButtons())
  );
  buttonsState.setOnUpdatePageCallback(onUpdatePage);
  buttonsState.updateButtonsStatuses(1);
  counterState.updatePageCount(count);
  return paginationButtonsContainer;
}

export { createPaginationButtons };
