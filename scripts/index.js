// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
 
// @todo: DOM узлы
const cards = document.querySelector('.places__list');
 
// @todo: Функция создания карточки
function generateNewCard(card, deleteBtn) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = 'Природа России';
    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {deleteBtn(evt);
    });
    return cardElement;
}
 
// @todo: Функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest(".card");
    card.remove();
}
  
// @todo: Вывести карточки на страницу
const outputCards = initialCards.map((card) => generateNewCard(card, deleteCard));
outputCards.forEach((card) => {cards.append(card);});