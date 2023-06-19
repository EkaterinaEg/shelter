import { cardArr } from "./slider.js";

let numberOfPages = 6;
let cardOnPage = 8;
let parts = 3;
let finalArray = [];

function initial() {
  let newArr = [];

  for (let i = 0; i < cardOnPage; i += 3) {
    newArr.push(cardArr.slice(i, i + parts));
  }
  console.log(newArr);

  function mixArray(array) {
    for (let i = 0; i < array.length; i += 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  for (let i = 0; i < 6; i += 1) {
    let element = newArr.map((el) => mixArray(el));
    finalArray.push(element.flat());
  }
  console.log(finalArray);
}

// const paginationState = {
//   currentPageCards: [],

//   petsData: [],

//   addCurrentPageCard(card) {
//     this.currentPageCards.push(card);
//   },
//   getCurrentPageCards() {
//     return this.currentPageCards;
//   },

//   updatePetsData(petsData) {
//     this.petsData = petsData;
//   },

//   showPage(number) {
//     this.currentPageCards.forEach((card, i) => {
//       const { img, name } = this.petsData[number - 1][i];
//       card.updateImage({ src: img, alt: name });
//       card.updateName({ textContent: name });
//     });
//   },
// };

export { numberOfPages, finalArray, initial };
