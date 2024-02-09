//ИМПОРТ из других файлов.....................................................
import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {
  generateNewCard,
  likeAnimation,
  deleteCard,
} from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

// @todo: DOM узлы объявления констант........................................
const cards = document.querySelector(".places__list");
const editBtn = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const plusBtn = document.querySelector(".profile__add-button");
const createCardPopup = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const formElementProfile = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const formElementCard = document.forms["new-place"];
const placeInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");
const allCards = document.querySelector(".places__list");

//MODAL открытие и закрытие....................................................

editBtn.addEventListener("click", function (evt) {
  evt.stopPropagation();
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  openModal(editPopup);
});

plusBtn.addEventListener("click", function (evt) {
  evt.stopPropagation();
  openModal(createCardPopup);
});

// РЕДАКИРОВАНИЕ ПРОФИЛЯ И ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ...............................
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileTitle.textContent = name;
  profileJob.textContent = job;
  closeModal(evt.target.closest(".popup"));
}
formElementProfile.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: placeInput.value,
    link: linkInput.value,
  };
  allCards.prepend(
    generateNewCard(card, deleteCard, likeAnimation, openPopupImg)
  );
  formElementCard.reset();
  closeModal(evt.target.closest(".popup"));
}
formElementCard.addEventListener("submit", handleCardFormSubmit);

// @todo: Вывести карточки на страницу.........................................
initialCards.forEach((card) => {
  cards.append(generateNewCard(card, deleteCard, likeAnimation, openPopupImg));
});

function openPopupImg(card) {
  popupImage.querySelector(".popup__image").src = card.link;
  popupImage.querySelector(".popup__image").alt = card.name;
  popupImage.querySelector(".popup__caption").textContent = card.name;
  openModal(popupImage);
}
