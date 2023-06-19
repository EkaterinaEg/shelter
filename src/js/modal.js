import { Popup } from "./popup.js";

export class Modal extends Popup {
  constructor(
    classes,
    {
      name,
      img,
      type,
      breed,
      description,
      age,
      inoculations,
      diseases,
      parasites,
    }
  ) {
    super(classes);
    this.name = name;
    this.img = img;
    this.type = type;
    this.breed = breed;
    this.description = description;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;
  }

  // Element Popup generator
  generateContent() {
    let template = "";
    let element = document.createElement("div");

    element.className = "popup__content";

    this.img &&
      (template += `<img class="content__img" src=${this.img} alt="pictures of pets">`);

    if (
      this.name ||
      this.type ||
      this.breed ||
      this.description ||
      this.age ||
      this.inoculations ||
      this.diseases ||
      this.parasites
    ) {
      template += `<ul class="content__list">`;

      this.name &&
        (template += `<li class="list__name"><h2>${this.name}</h2></li>`);
      this.type &&
        (template += `<li class="list__type"><h3>${this.type} - ${this.breed}</h3></li>`);
      this.description &&
        (template += `<li class="list__description"><h4>${this.description}</li>`),
        this.age &&
          (template += `<li class="list__age"><h4><b>Age:</b> ${this.age}</h4></li>`);
      this.inoculations &&
        (template += `<li class="list__inoculations"><h4><b>Inoculations:</b> ${this.inoculations}</h4></li>`);
      this.diseases &&
        (template += `<li class="list__diseases"><span><h4><b>Diseases:</b> ${this.diseases}</h4></li>`);
      this.parasites &&
        (template += `<li class="list__parasites"><h4><b>Parasites:</b> ${this.parasites}</h4></li>`);

      template += `</div>`;
    }

    element.innerHTML = template;
    // console.log(`element: ${element}`);
    return element;
  }

  renderPopup() {
    let content = this.generateContent();
    // console.log(overlayPopup);
    super.buildPopup(content);
  }
}
