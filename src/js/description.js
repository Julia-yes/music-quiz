export function renderDescription(obj) {
  let optionsWrapper = document.querySelector(".options__description-wrapper");
  optionsWrapper.innerHTML = `<div class="description__top">
    <img class="description__image" src="${obj.image}"></img>
    <div class="description__info">
      <div class="description__name">
        <div class="description__ru">${obj.name}</div>
        <div class ="description__eng">(${obj.eng})</div>
      </div>
      <div class="description__audio"></div>
    </div>
  </div>
  <div class = "description__text">${obj.description}</div>`
}