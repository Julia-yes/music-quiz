import {showDescription, checkWin} from "./game";

export function renderOptions(array) {
  let optionsWrapper = document.querySelector(".options__list-wrapper");

  let options = `<ul class="options__list">`;
    for (let i = 0; i < array.length; i++) {
      options += `<li class="options__item" id="${array[i].id}"><span class="options__decor"></span>${array[i].name}</li>`
    }
  options += `</ul>`;
  optionsWrapper.innerHTML = `${options}`;
}

export function clickOption(event) {
  showDescription(event.currentTarget.id);
  checkWin(event.currentTarget.id);
}

export function changeCorrectColor(optionId) {
  let option = document.getElementById(optionId);
  option.classList.add("correct");
}

export function changeWrongColor(optionId) {
  let option = document.getElementById(optionId);
  option.classList.add("wrong");
}