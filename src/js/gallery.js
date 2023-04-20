import { database } from "./database";
import { Player } from "./player";
const gallery = document.querySelector(".gallery");

function renderGallery() {
  let gallery = document.querySelector(".gallery");
  if (gallery) {
    let galleryContent = "";
    if (gallery) {
      for (let data of database) {
        let item = createGalleryItem(data.image, data.name, data.description, data.id, data.eng);
        galleryContent += item;
      }
    }
    gallery.innerHTML = galleryContent 
  }
}

function addPlayers() {
  for (let data of database) {
    addPlayer(data.id, data.audio)
  }
}

function addPlayer(id, src) {
  let audioTag = document.querySelector(`.gallery__player${id}`)
  let player = new Player(id, audioTag, src);
}

function createGalleryItem(path, name, description, id, eng) {
  let item = `
  <div class="gallery__item">
    <div class="gallery__top">
      <img src = ${path} alt = "catroot image" class="gallery__img">
      <div class = "gallery__aside">
        <div class = "gallery__name">${name} (${eng})</div>
        <div class = "gallery__player gallery__player${id}"></div>
      </div>
    </div>
    <div class = "gallery__description">${description}</div>
  </div>`
  return item
}

if (gallery) {
  renderGallery();
  addPlayers();
}
