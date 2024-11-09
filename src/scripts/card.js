
import { putLike, deleteLike, removeCard } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

// @todo: функция создания карточки
function createCard(
  cardData,
  { userId, deleteCard, onLike, handleImageClick }
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const cardLikeNumber = cardElement.querySelector(".card__like-number");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardLikeNumber.textContent = cardData.likes.length;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  if (userId !== cardData.owner._id) {
    cardDeleteButton.style.display = "none";
  } else {
    cardDeleteButton.style.display = "block";
    cardDeleteButton.addEventListener("click", () =>
      deleteCard(cardElement, cardData._id)
    );
  }

  const myLike = cardData.likes.some((like) => like._id === userId);
  if (myLike) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  buttonLike.addEventListener("click", () =>
    onLike(buttonLike, cardLikeNumber, cardData._id)
  );

  cardImage.addEventListener("click", () => {
    handleImageClick(cardImage, cardTitle);
  });

  return cardElement;
}

// @todo: Вывести карточки на страницу
function deleteCard(card, cardId) {
  removeCard(cardId)
    .then(() => card.remove())
    .catch((err) => {
      console.log(err);
    });
}

//@todo: функция установки Like
function onLike(buttonLike, cardLikeNumber, cardId) {
  const likeMethod = buttonLike.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLike
    : putLike;
  likeMethod(cardId)
    .then((res) => {
      buttonLike.classList.toggle("card__like-button_is-active");
      cardLikeNumber.textContent = res.likes.length;
    })
    .catch((err) => console.log(err));
}

export { createCard, deleteCard, onLike };
