import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, onLike } from "./scripts/card.js";
import { openPopup, closePopup } from "./scripts/modal.js";
import {
  validationConfig,
  enableValidation,
  clearValidation,
} from "./scripts/validation.js";
import {
  getUserInfo,
  getInitialCards,
  editUserProfile,
  addNewCard,
  removeCard,
  putLike,
  deleteLike,
  updateUserAvatar,
} from "./scripts/api.js";

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
const avatarBtn = document.querySelector(".profile__image_button");
const popupEditAvatar = document.querySelector(".popup_type_avatar");
const avatarUrlInput = popupEditAvatar.querySelector(".popup__avatar_type_url");
const formAvatar = document.forms["avatar"];
const closeAvatarBtn = popupEditAvatar.querySelector(".popup_closeAvatar");
const profileImg = document.querySelector(".profile__image");

let userId = "";

// @todo: Вывести карточки на страницу
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, initialCards]) => {
    profileName.textContent = userData.name;
    profileDesc.textContent = userData.about;
    profileImg.setAttribute(
      "style",
      `background-image:url(${userData.avatar})`
    );
    userId = userData._id;

    initialCards.forEach((cardData) => {
      const cardElement = createCard(cardData, {
        userId,
        deleteCard,
        onLike,
        handleImageClick,
      });
      cardList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

function renderCards() {
  initialCards.forEach((cardData) => {
    cardList.append(
      createCard(cardData, { userId, deleteCard, onLike, handleImageClick })
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
  formEdit.elements.name.value = profileName.textContent;
  formEdit.elements.description.value = profileDesc.textContent;
  clearValidation(formEdit, validationConfig);
  openPopup(popupEdit);
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

  const newName = nameInput.value;
  const newDesc = descInput.value;

  formEdit.querySelector(".popup__button").textContent = "Сохранить...";

  editUserProfile(newName, newDesc)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDesc.textContent = userData.about;
      userId = userData._id;

      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    })
    .finally(() => {
      formEdit.querySelector(".popup__button").textContent = "Сохранить";
    });
  clearValidation(formEdit, validationConfig);

  closePopup(popupEdit);
});

formAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const nameValue = addNameInput.value;
  const linkValue = addUrlInput.value;

  formAdd.querySelector(".popup__button").textContent = "Сохранить...";

  addNewCard(nameValue, linkValue)
    .then((cardData) => {
      const newCardElement = createCard(cardData, {
        userId,
        deleteCard,
        onLike,
        handleImageClick,
      });
      cardList.prepend(newCardElement);
      closePopup(popupAdd);
      formAdd.reset();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      formAdd.querySelector(".popup__button").textContent = "Сохранить";
    });

  evt.target.reset();
  // cardList.prepend(createCard(newCardData,  { deleteCard, onLike, handleImageClick }));
  //closePopup(popupAdd);
});

avatarBtn.addEventListener("click", () => {
  openPopup(popupEditAvatar);
});

closeAvatarBtn.addEventListener("click", () => {
  closePopup(popupEditAvatar);
});

formAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();

  formAvatar.querySelector(".popup__button").textContent = "Сохранение...";
  updateUserAvatar(avatarUrlInput)
    .then((res) => {
      profileImg.setAttribute("style", `background-image:url(${res.avatar})`);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      formAvatar.querySelector(".popup__button").textContent = "Сохранить";
    });
  clearValidation(formEdit, validationConfig);
  closePopup(popupEditAvatar);
});

enableValidation(validationConfig);
renderCards();
