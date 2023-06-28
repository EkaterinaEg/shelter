"use strict";
import { createElement } from "./createElement.js";

const OUR_FRIENDS_CONTAINER = document.querySelector(".our-friends__container");

let buttonLeft = null;
let buttonRight = null;
let buttonContainer = null;
let buttonOurFriends = null;

function createSliderButtons() {
  buttonContainer = createElement("div", "our-friends__buttons");

  buttonLeft = createElement("button", "button");
  buttonLeft.classList.add(
    "buttons__btn-slider_arrow-left",
    "buttons__btn-slider"
  );
  // buttonLeft.classList.add("buttons__btn-slider");

  buttonRight = createElement("button", "button");
  buttonRight.classList.add(
    "buttons__btn-slider",
    "buttons__btn-slider_arrow-right"
  );
  // buttonRight.classList.add("buttons__btn-slider_arrow-right");

  buttonOurFriends = createElement("a", "button");
  buttonOurFriends.setAttribute("href", "/src/pets.html");
  buttonOurFriends.classList.add("our-friends__button", "button_colored");
  buttonOurFriends.textContent = "Get to know the rest";

  OUR_FRIENDS_CONTAINER.append(buttonContainer);
  OUR_FRIENDS_CONTAINER.append(buttonOurFriends);

  buttonContainer.append(buttonLeft);
  buttonContainer.append(buttonRight);
}
createSliderButtons();
