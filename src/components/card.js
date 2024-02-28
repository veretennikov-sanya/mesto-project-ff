import { likeCard, unlikeCard } from "./api.js";

// @todo: Темплейт карточки
const content = document.querySelector("#card-template").content;
const templateCard = content.querySelector(".card");

// @todo: Функция создания карточки
const generateNewCard = function (
  item,
  userId,
  removeCard,
  likeAnimation,
  openPopupImage
) {
  const cardElement = templateCard.cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");
  cardElement.id = item["_id"];

  cardImg.setAttribute("src", item.link);
  cardImg.setAttribute("alt", item.name);
  cardTitle.textContent = item.name;
  cardLikeCount.textContent = item.likes.length;

  const isLiked = item.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeBtn.classList.add("card__like-button_is-active");
  }

  if (item.owner._id === userId) {
    cardDeleteBtn.addEventListener("click", (evt) => {
      removeCard(evt, item._id);
    });
  } else {
    cardDeleteBtn.remove();
  }

  likeBtn.addEventListener("click", (evt) => {
    likeAnimation(evt, item._id);
  });

  cardImg.addEventListener("click", function () {
    openPopupImage(item);
  });

  return cardElement;
};

const likeAnimation = (evt, cardId) => {
  const currentLikes = evt.target.parentNode.querySelector(".card__like-count");
  if (evt.target.classList.contains("card__like-button_is-active")) {
    unlikeCard(cardId)
      .then((updatedCard) => {
        evt.target.classList.remove("card__like-button_is-active");
        currentLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCard(cardId)
      .then((updatedCard) => {
        evt.target.classList.add("card__like-button_is-active");
        currentLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export { generateNewCard, likeAnimation };
