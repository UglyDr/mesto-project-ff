import { openPopup } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
// @todo: функция создания карточки
function createCard(cardData, { deleteCard, onLike, handleImageClick }) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", onLike);

  cardImage.addEventListener("click", () => {
    handleImageClick(cardImage, cardTitle);
  });

  return cardElement;
}

// @todo: Вывести карточки на страницу
function deleteCard(cardElement) {
  cardElement.remove();
}

//@todo: функция установки Like
function onLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, onLike };
