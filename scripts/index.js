// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const mainContainer = document.querySelector('.content');
const cardList = mainContainer.querySelector('.places__list');
// @todo: Функция создания карточки
function addCards(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const addCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  
    addCard.querySelector('.card__title').textContent = cardData.name;
    addCard.querySelector('.card__image').src = cardData.link;
    addCard.querySelector('.card__image').alt = cardData.name;
    const deleteButton = addCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    return addCard;
}
// @todo: Функция удаления карточки
function deleteCard (event) {
    event.target.closest('.places__item').remove();
}
// @todo: Вывести карточки на страницу
function renderCards () {
    initialCards.forEach((cardData) => {
    cardList.append(addCards(cardData));    
});
};

renderCards();

