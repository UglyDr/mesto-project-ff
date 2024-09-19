// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const mainContainer = document.querySelector('.content');
const cardList = mainContainer.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage =  cardElement.querySelector('.card__image');
  
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard (event) {
    cardElement.remove();
}
// @todo: Вывести карточки на страницу
function renderCards () {
    initialCards.forEach((cardData) => {
    cardList.append(createCard(cardData));    
});
}

renderCards();

