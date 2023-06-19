import { data } from "./js/data.js";
import "./js/hamburger.js";
import { Card } from "./js/card.js";

const dataWithId = data.map((n, i) => ({ id: i + 1, ...n }));
// ________________________________________________________Burger-menu
// const burger = document.querySelector(".hamburger");
// const menu = document.querySelector(".menu-list");
// const overlay = document.querySelector(".overlay");
// const links = document.querySelectorAll(".menu-item");
// const btnLeft = document.querySelector(".arrow-left");
// const btnRight = document.querySelector(".arrow-right");

// const openMenu = function () {
//   burger.classList.add("rotate-burger");
//   document.body.classList.add("lock");
//   menu.classList.add("active-burger-menu");
//   overlay.classList.remove("hidden");
// };

// const closeMenu = function () {
//   burger.classList.remove("rotate-burger");
//   document.body.classList.remove("lock");
//   menu.classList.remove("active-burger-menu");
//   overlay.classList.add("hidden");
// };
// burger.addEventListener("click", function () {
//   if (menu.classList.contains("active-burger-menu")) {
//     closeMenu();
//   } else {
//     openMenu();
//   }
// });

// links.forEach((link) => {
//   link.addEventListener("click", closeMenu);
// });

// overlay.addEventListener("click", closeMenu);

// ___________________________________________________Cards
// Create cards in slider
// class Card {
//   constructor({ name, img, id, ...rest }) {
//     this.name = name;
//     this.img = img;
//     this.id = id;
//     // this.button = button;
//   }
//   generateCard() {
//     let template = "";
//     let element = document.createElement("div");
//     element.className = "card";

//     // .find((popup) => popup.id == id);
//     element.setAttribute("data-id", this.id);

//     this.img && (template += `<img src=${this.img} alt="pictures of pets">`);
//     this.name && (template += `<p class="card-title">${this.name}</p>`);
//     template += `<a href="#" class="card-button button">Learn more</a>`;
//     template += `</div>`;

//     element.innerHTML = template;
//     return element;
//   }
// }

window.onload = function () {
  if (data) {
    renderCardToDom();
    addCardClickHandler();
  }
};
const renderCardToDom = () => {
  let cards = getCardsContainer();
  generateCards(data).forEach((card) => {
    cards.append(card.generateCard());
  });
  //   console.log(cards);
};
const getCardsContainer = () => {
  const cardContainer = document.querySelector(".cards");
  cardContainer.innerHTML = "";
  return cardContainer;
};

const generateCards = (data) => {
  let cardArr = [];
  dataWithId.forEach((card, i) => {
    cardArr.push(new Card(card));
  });
  for (let i = cardArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cardArr[i];
    cardArr[i] = cardArr[j];
    cardArr[j] = temp;
  }

  return cardArr;
};

// // __________________________Popup

// class Popup {
//   constructor(classes) {
//     this.classes = classes;
//     this.popup = "";
//     this.popupContent = "";
//     this.popupCloseBtn = "";
//     this.overlayPopup = "";
//   }

//   buildPopup(content) {
//     //Overlay
//     this.overlayPopup = this.createDomNode(
//       this.overlayPopup,
//       "div",
//       "overlay-popup"
//     );

//     //popup
//     this.popup = this.createDomNode(this.popup, "div", "popup", this.classes);

//     //Popup content
//     this.popupContent = this.createDomNode(
//       this.popupContent,
//       "div",
//       "popup-content"
//     );

//     //Close Button
//     this.popupCloseBtn = this.createDomNode(
//       this.popupCloseBtn,
//       "div",
//       "popup-close-icon"
//     );

//     this.popupCloseBtn.innerHTML =
//       '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/></svg>';

//     this.setContent(content);

//     this.appendPopupElements();

//     // console.log(overlayPopup);

//     // Bind Events
//     this.bindEvents(); // for closeButton and overlay

//     // // Open Popup
//     this.openPopup();
//     // this.closePopup();
//   }

//   createDomNode(node, element, ...classes) {
//     node = document.createElement(element);
//     node.classList.add(...classes);
//     return node;
//   }

//   setContent(content) {
//     if (typeof content === "string" || typeof content === []) {
//       this.popupContent.innerHTML = content;
//     } else {
//       this.popupContent.innerHTML = "";
//       this.popupContent.appendChild(content);
//     }
//     // console.log(overlayPopup);
//   }
//   appendPopupElements() {
//     this.popup.append(this.popupCloseBtn);
//     this.popup.append(this.popupContent);
//     this.overlayPopup.append(this.popup);
//   }

//   bindEvents() {
//     this.popupCloseBtn.addEventListener("click", this.closePopup);
//     // console.log("hi");
//     this.overlayPopup.addEventListener("click", this.closePopup);
//   }

//   openPopup() {
//     console.log("hi");
//     document.body.append(this.overlayPopup);
//     document.body.classList.add("lock");
//   }

//   closePopup(e) {
//     // console.log("hello");
//     // console.log(e.target);
//     // console.log(e.currenttarget);
//     let classes = e.target.classList;
//     console.log(classes);
//     if (
//       classes.contains("overlay-popup") ||
//       classes.contains("popup-close-icon")
//     ) {
//       // console.log(classes);
//       document.querySelector(".overlay-popup").remove(); // delete popup
//       document.body.classList.remove("lock");
//       // console.log(document.querySelector(".overlay-popup"));
//     }
//   }
// }
// // ____________________________________
// const generateAttribute = () => {
//   let id;
//   let animal = document.querySelectorAll(".card");
//   animal.forEach((a, i) => a.setAttribute("data-id", i + 1));
// };
// generateAttribute();

// const addCardClickHandler = () => {
//   document.querySelector(".cards").addEventListener("click", (e) => {
//     if (e.target.closest(".card")) {
//       let clickedCardId = e.target.closest(".card").getAttribute("data-id");
//       let clickedPopupData = getClickedData(clickedCardId);

//       //   console.log(clickedPopupData);
//       renderElementModal(clickedPopupData);
//     }
//   });
// };
// const getClickedData = (id) => {
//   return dataWithId.find((popup) => popup.id == id);
// };

// const renderElementModal = (el) => {
//   let popup = new Modal("popup", el);
//   //   console.log(popup);
//   popup.renderPopup();
// };

// // console.log(document.querySelector(".popup-close-icon"));
// // console.log(document.querySelector(".overlay-popup"));
// // document
// //   .querySelector(".popup-close-icon")
// //   .addEventListener("click", function () {
// //     document.querySelector(".overlay-popup").classList.remove();
// //   });

// class Modal extends Popup {
//   constructor(
//     classes,
//     {
//       name,
//       img,
//       type,
//       breed,
//       description,
//       age,
//       inoculations,
//       diseases,
//       parasites,
//     }
//   ) {
//     super(classes);
//     this.name = name;
//     this.img = img;
//     this.type = type;
//     this.breed = breed;
//     this.description = description;
//     this.age = age;
//     this.inoculations = inoculations;
//     this.diseases = diseases;
//     this.parasites = parasites;
//   }

//   // Element Popup generator
//   generateContent() {
//     let template = "";
//     let element = document.createElement("div");

//     element.className = "friends-popup";

//     this.img &&
//       (template += `<img class="popup-image" src=${this.img} alt="pictures of pets">`);

//     if (
//       this.name ||
//       this.type ||
//       this.breed ||
//       this.description ||
//       this.age ||
//       this.inoculations ||
//       this.diseases ||
//       this.parasites
//     ) {
//       template += `<ul class="content">`;

//       this.name &&
//         (template += `<li class="popup-content-name"><h2>${this.name}</h2></li>`);
//       this.type &&
//         (template += `<li class="popup-content-type"><h3>${this.type} - ${this.breed}</h3></li>`);
//       this.description &&
//         (template += `<li class="popup-content-description"><h4>${this.description}</li>`),
//         this.age &&
//           (template += `<li class="popup-content-age"><span><h4><b>Age:</b> ${this.age}</h4></span></li>`);
//       this.inoculations &&
//         (template += `<li class="popup-content-inoculations"><span><h4><b>Inoculations:</b> ${this.inoculations}</h4></span></li>`);
//       this.diseases &&
//         (template += `<li class="popup-content-diseases"><span><h4><b>Diseases:</b> ${this.diseases}</h4></span></li>`);
//       this.parasites &&
//         (template += `<li class="popup-content-parasites"><span><h4><b>Parasites:</b> ${this.parasites}</h4></span></li>`);

//       template += `</div>`;
//     }

//     element.innerHTML = template;
//     // console.log(`element: ${element}`);
//     return element;
//   }

//   renderPopup() {
//     let content = this.generateContent();
//     // console.log(overlayPopup);
//     super.buildPopup(content);
//   }
// }
