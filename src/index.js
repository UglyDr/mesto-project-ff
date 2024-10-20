import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, onLike } from "./scripts/card.js";
import { openPopup, closePopup } from "./scripts/modal.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const mainContainer = document.querySelector(".content");
const cardList = mainContainer.querySelector(".places__list");
const editBtn = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeProfileBtn = document.querySelector(".popup_closeProfile");
const closeNewCardBtn = document.querySelector(".popup_closeNewCard");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const formEdit = document.forms["edit-profile"];
const formAdd = document.forms["new-place"];
const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__title");
const profileDesc = profileInfo.querySelector(".profile__description");
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const descInput = popupEdit.querySelector(".popup__input_type_description");
const addNameInput = popupAdd.querySelector(".popup__input_type_card-name");
const addUrlInput = popupAdd.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup_type_image");
const popupImageContent = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const closeImageBtn = document.querySelector(".popup_imageClose");

// @todo: Вывести карточки на страницу
function renderCards() {
  initialCards.forEach((cardData) => {
    cardList.append(
      createCard(cardData, { deleteCard, onLike, handleImageClick })
    );
  });
}

function handleImageClick(cardImage, cardTitle) {
  popupImageContent.setAttribute("src", cardImage.src);
  popupImageContent.setAttribute("alt", cardTitle.textContent);
  popupImageCaption.textContent = cardTitle.textContent;
  openPopup(popupImage);
}

// @todo: Слушатели
editBtn.addEventListener("click", () => {
  openPopup(popupEdit);
  formEdit.elements.name.value = profileName.textContent;
  formEdit.elements.description.value = profileDesc.textContent;
});
closeProfileBtn.addEventListener("click", () => {
  closePopup(popupEdit);
});

addButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

closeNewCardBtn.addEventListener("click", () => {
  closePopup(popupAdd);
});

closeImageBtn.addEventListener("click", () => {
  closePopup(popupImage);
});

formEdit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = descInput.value;
  closePopup(popupEdit);
});

formAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: addNameInput.value,
    link: addUrlInput.value,
    alt: addNameInput.value,
  };
  evt.target.reset();
  cardList.prepend(createCard(newCardData, deleteCard));
  closePopup(popupAdd);
});

renderCards();
