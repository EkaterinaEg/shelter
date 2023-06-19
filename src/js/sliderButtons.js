import { createElement } from "./createElement.js";

let buttonLeft = null;
let buttonRight = null;
let buttonContainer = null;

function createSliderButtons() {
  buttonContainer = createElement("div", "our-friends__buttons");

  buttonLeft = createElement("button", "button");
  buttonLeft.classList.add("buttons__btn-slider_arrow-left");
  buttonLeft.classList.add("buttons__btn-slider");

  buttonRight = createElement("button", "button");
  buttonRight.classList.add("buttons__btn-slider");
  buttonRight.classList.add("buttons__btn-slider_arrow-right");

  document.querySelector(".our-friends__container").append(buttonContainer);
  buttonContainer.append(buttonLeft);
  buttonContainer.append(buttonRight);
  console.log(buttonContainer);
  console.log(document.querySelector(".slider_main"));
}
createSliderButtons();
