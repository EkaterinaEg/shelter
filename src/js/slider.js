"use strict";
import { DATA_WITH_ID } from "./data.js";
import { Card } from "./card.js";
import { createElement } from "./createElement.js";
import "./sliderButtons.js";
// import { numberOfCards } from "./media.js";

const BUTTON_RIGHT = document.querySelector(".buttons__btn-slider_arrow-right");
const BUTTON_LEFT = document.querySelector(".buttons__btn-slider_arrow-left");
const CARD_CONTAINER = document.querySelector(".slider_main");

const COUNT_CARD_BLOCK = 3;

let cardArr = new Array();
let pressButtonAvailable = true;

let numberOfCards;
// function setNumberOfCards(value) {
//   numberOfCards = value;
//   return numberOfCards;
// }
// setNumberOfCards(3);

for (let i = 1; i <= COUNT_CARD_BLOCK; i++) {
  const cardGroup = createElement("div", "slider__block");
  cardGroup.classList.add(`block-${i}`);

  CARD_CONTAINER.append(cardGroup);
}

const BLOCK_LEFT = document.querySelector(".block-1");
const BLOCK_ACTIVE = document.querySelector(".block-2");
const BLOCK_RIGHT = document.querySelector(".block-3");

cardArr = DATA_WITH_ID.map((card) => new Card(card));

cardArr.sort((a, b) => 0.5 - Math.random());

function arraySlider(array, id) {
  while (id < 0) {
    id += array.length;
  }
  while (id >= array.length) {
    id -= array.length;
  }
  return array[id];
}

let index = 0;

function checkScreen(array, index) {
  const pageWidth = document.documentElement.scrollWidth;

  if (pageWidth >= 1280) {
    numberOfCards = 3;
  } else if (pageWidth <= 767.9) {
    numberOfCards = 1;
  } else {
    numberOfCards = 2;
  }

  fillblocks(array, index);
  console.log(pageWidth);
  console.log(numberOfCards);
}

checkScreen(cardArr, index);

function fillblocks(array, index) {
  if (CARD_CONTAINER) {
    BLOCK_ACTIVE.innerHTML = "";
    BLOCK_RIGHT.innerHTML = "";
    BLOCK_LEFT.innerHTML = "";
    for (let i = index; i < index + numberOfCards; i++) {
      BLOCK_ACTIVE.append(arraySlider(array, i).generateCard());
    }

    for (let i = index + numberOfCards; i < index + numberOfCards * 2; i++) {
      BLOCK_RIGHT.append(arraySlider(array, i).generateCard());
    }
    for (let i = index - numberOfCards; i < index; i++) {
      BLOCK_LEFT.append(arraySlider(array, i).generateCard());
    }
  }
}

// fillblocks(cardArr, index);

const moveRight = () => {
  if (pressButtonAvailable) {
    CARD_CONTAINER.classList.add("transition_right");
    pressButtonAvailable = false;
  }
};

const moveLeft = () => {
  if (pressButtonAvailable) {
    CARD_CONTAINER.classList.add("transition_left");
    pressButtonAvailable = false;
  }
};

BUTTON_LEFT.addEventListener("click", moveLeft);
BUTTON_RIGHT.addEventListener("click", moveRight);

CARD_CONTAINER.addEventListener("animationend", (animationEvent) => {
  pressButtonAvailable = true;

  if (animationEvent.animationName === "animation_left") {
    CARD_CONTAINER.classList.remove("transition_left");
    index -= numberOfCards;
    fillblocks(cardArr, index);
  }
  if (animationEvent.animationName === "animation_right") {
    CARD_CONTAINER.classList.remove("transition_right");
    index += numberOfCards;
    fillblocks(cardArr, index);
  }
});

// export { numberOfCards, setNumberOfCards, fillblocks, cardArr, index };
export { fillblocks, cardArr, index, checkScreen };
// export { handleLaptopChange };
