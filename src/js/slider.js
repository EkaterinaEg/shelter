import { DATA_WITH_ID } from "./data.js";
import { Card } from "./card.js";
import { createElement } from "./createElement.js";
import "./sliderButtons.js";

const BUTTON_RIGHT = document.querySelector(".buttons__btn-slider_arrow-right");
const BUTTON_LEFT = document.querySelector(".buttons__btn-slider_arrow-left");

const CARD_CONTAINER = document.querySelector(".slider_main");
export const COUNT_CARD_BLOCK = 3;

let right = [];
let cardArr = new Array();
let visibleCards = new Array();
let countCard = 3;

function createSlider() {
  // create card
  const generateCards = (data) => {
    // let cardArr = [];
    data.forEach((card) => {
      const element = new Card(card);
      cardArr.push(element.generateCard());
    });
    //   shuffle cards
    for (let i = 0; i < cardArr.length; i += 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = cardArr[i];
      cardArr[i] = cardArr[j];
      cardArr[j] = temp;
    }

    // Create block for left, right, active
    for (let i = 0; i < COUNT_CARD_BLOCK; i += 1) {
      const cardGroup = createElement("div", "slider__block");
      cardGroup.classList.add(`block-${i + 1}`);
      // cardGroup.style.order = `${i + 1}`;
      if (CARD_CONTAINER) {
        CARD_CONTAINER.append(cardGroup);
      }
    }
    // number of cards for each page
    // if (CARD_CONTAINER.classList.contains("slider_main")) {
    //   countCard = 3;
    // } else {
    //   countCard = 8;
    // }
  };

  generateCards(DATA_WITH_ID);
}

createSlider();

const BLOCK_LEFT = document.querySelector(".block-1");
const BLOCK_ACTIVE = document.querySelector(".block-2");
const BLOCK_RIGHT = document.querySelector(".block-3");

function fillblocks() {
  // - 1. генерируем массив nextArr

  for (let i = 0; i < countCard; i += 1) {
    BLOCK_RIGHT.insertAdjacentElement("beforeend", cardArr[i]);
    // right.push(cardArr[i]);
    visibleCards.push(cardArr[i]);
  }
  // - 2. перемещаем значения из массива nextArr (попутно его обнуляя) в массив currArr;

  BLOCK_ACTIVE.innerHTML = BLOCK_RIGHT.innerHTML;
  BLOCK_RIGHT.innerHTML = "";

  // - 3. генерируем массив nextArr (помним про проверку на наличие значений в currArr);

  cardArr.forEach((card) => {
    if (!visibleCards.includes(card)) {
      right.push(card);
    }
  });

  visibleCards.length = 0;
  for (let i = 0; i < countCard; i += 1) {
    BLOCK_RIGHT.insertAdjacentElement("beforeend", right[i]);

    visibleCards.push(right[i]);
  }

  // - 4. перемещаем значения из массива currArr (попутно его обнуляя) в массив pastArr;
  BLOCK_LEFT.innerHTML = BLOCK_ACTIVE.innerHTML;
  BLOCK_ACTIVE.innerHTML = "";

  // // - 5. перемещаем значения из массива nextArr (попутно его обнуляя) в массив currArr;
  BLOCK_ACTIVE.innerHTML = BLOCK_RIGHT.innerHTML;
  BLOCK_RIGHT.innerHTML = "";

  // // - 6. генерируем массив nextArr (помним про проверку на наличие значений в currArr);

  right.length = 0;
  while (right.length < countCard) {
    let index = Math.floor(Math.random() * cardArr.length);
    if (
      !visibleCards.includes(cardArr[index]) &&
      !right.includes(cardArr[index])
    ) {
      right.push(cardArr[index]);
    }
  }

  right.forEach((card) => BLOCK_RIGHT.insertAdjacentElement("beforeend", card));
}

const moveLeft = () => {
  CARD_CONTAINER.classList.add("transition_left");
  BUTTON_LEFT.removeEventListener("click", moveLeft);
  BUTTON_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
  CARD_CONTAINER.classList.add("transition_right");
  BUTTON_LEFT.removeEventListener("click", moveLeft);
  BUTTON_RIGHT.removeEventListener("click", moveRight);
};
if (BUTTON_LEFT && BUTTON_RIGHT) {
  BUTTON_LEFT.addEventListener("click", moveLeft);
  BUTTON_RIGHT.addEventListener("click", moveRight);
}
if (CARD_CONTAINER) {
  CARD_CONTAINER.addEventListener("animationend", (animationEvent) => {
    let temp = [];
    if (animationEvent.animationName === "animation_left") {
      visibleCards.length = 0;
      for (let i = 0; i < BLOCK_ACTIVE.children.length; i++) {
        visibleCards.push(BLOCK_ACTIVE.children[i].getAttribute("data-id"));
      }

      while (BLOCK_LEFT.firstElementChild) {
        BLOCK_LEFT.firstElementChild.remove();
      }

      while (temp.length < countCard) {
        let index = Math.floor(Math.random() * cardArr.length);

        if (
          !visibleCards.includes(cardArr[index].getAttribute("data-id")) &&
          !temp.includes(cardArr[index])
        ) {
          temp.push(cardArr[index]);
        }
      }

      temp.forEach((card) =>
        BLOCK_LEFT.insertAdjacentElement("beforeend", card)
      );
      temp.length = 0;

      BLOCK_RIGHT.innerHTML = "";
      BLOCK_RIGHT.innerHTML = BLOCK_ACTIVE.innerHTML;
      BLOCK_ACTIVE.innerHTML = BLOCK_LEFT.innerHTML;

      CARD_CONTAINER.classList.remove("transition_left");
    } else {
      BLOCK_LEFT.innerHTML = "";
      BLOCK_LEFT.innerHTML = BLOCK_ACTIVE.innerHTML;
      BLOCK_ACTIVE.innerHTML = BLOCK_RIGHT.innerHTML;

      visibleCards.length = 0;
      for (let i = 0; i < BLOCK_ACTIVE.children.length; i++) {
        visibleCards.push(BLOCK_ACTIVE.children[i].getAttribute("data-id"));
      }

      while (BLOCK_RIGHT.firstElementChild) {
        BLOCK_RIGHT.firstElementChild.remove();
      }

      while (temp.length < countCard) {
        let index = Math.floor(Math.random() * cardArr.length);

        if (
          !visibleCards.includes(cardArr[index].getAttribute("data-id")) &&
          !temp.includes(cardArr[index])
        ) {
          temp.push(cardArr[index]);
        }
      }

      temp.forEach((card) =>
        BLOCK_RIGHT.insertAdjacentElement("beforeend", card)
      );
      temp.length = 0;
      CARD_CONTAINER.classList.remove("transition_right");
    }
    BUTTON_LEFT.addEventListener("click", moveLeft);
    BUTTON_RIGHT.addEventListener("click", moveRight);
  });
}
export { createSlider, fillblocks, cardArr, CARD_CONTAINER };
