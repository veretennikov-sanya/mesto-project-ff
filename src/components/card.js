// @todo: Функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;

export function generateNewCard(card, deleteBtn, likeAnimation, popupImg) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () => likeAnimation(likeBtn));
  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardImg.addEventListener("click", () => popupImg(card));
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (evt) => {
      deleteBtn(evt);
    });
  return cardElement;
}

// функция лайка
export function likeAnimation(likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
export function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}
