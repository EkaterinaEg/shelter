export class Card {
  constructor({ name, img, id }) {
    this.name = name;
    this.img = img;
    this.id = id;
    // this.button = button;
  }
  generateCard() {
    let template = "";
    let element = document.createElement("div");
    element.className = "slider__card";

    element.setAttribute("data-id", this.id);

    this.img &&
      (template += `<img src=${this.img} alt="pictures of pets" class="card__img">`);
    this.name && (template += `<p class="card__title">${this.name}</p>`);
    template += `<button class="card__button button">Learn more</button>`;
    template += `</div>`;

    element.innerHTML = template;
    return element;
  }
}
