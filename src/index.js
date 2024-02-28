import "./pages/index.css";
import { generateNewCard, likeAnimation } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getProfile,
  editProfile,
  editAvatar,
  getInitialCards,
  createNewCard,
  removeCard,
} from "./components/api.js";

// @todo: DOM узлы
const allPopup = Array.from(document.querySelectorAll(".popup"));
const cardsContainer = document.querySelector(".places__list");
const createCardPopup = document.querySelector(".popup_type_new-card");
const editPopup = document.querySelector(".popup_type_edit");
const avatarPopup = document.querySelector(".popup_type_avatar");
const сonfirmPopup = document.querySelector(".popup_type_confirm");
const formElementProfile = document.forms["edit-profile"];
const formElementAvatar = document.forms["edit-avatar"];
const formElementCard = document.forms["new-place"];
const imagePopup = document.querySelector(".popup_type_image");
const popupImgCard = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const editBtn = document.querySelector(".profile__edit-button");
const buttonEditAvatar = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const plusBtn = document.querySelector(".profile__add-button");
const buttonConfirmAccept = сonfirmPopup.querySelector(
  ".confirm_accept__button"
);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let userId = "";

function openPopupImg(item) {
  popupImgCard.src = item.link;
  popupImgCard.alt = item.name;
  popupCaption.textContent = item.name;
  openModal(imagePopup);
}


Promise.all([getProfile(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    userId = userInfo._id;
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

    initialCards.forEach((card) => {
      const newCard = generateNewCard(
        card,
        userId,
        confirmDeleteCard,
        likeAnimation,
        openPopupImg
      );
      cardsContainer.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
});

const renderLoading = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

const confirmDeleteCard = (evt, cardId) => {
  openModal(сonfirmPopup);
  сonfirmPopup.dataset.cardId = cardId;
};

const handleConfirmDeleteCard = async (evt) => {
  removeCard(сonfirmPopup.dataset.cardId)
    .then((res) => {
      const card = document.getElementById(сonfirmPopup.dataset.cardId);
      card.remove();
      сonfirmPopup.dataset.cardId = "";
      closeModal(сonfirmPopup);
    })
    .catch((err) => {
      console.log(err);
    });
};
buttonConfirmAccept.addEventListener("click", handleConfirmDeleteCard);

const handleFormEditSubmit = async (evt) => {
  evt.preventDefault();
  renderLoading(true, formElementProfile.querySelector(".popup__button"));
  editProfile({
    name: formElementProfile.name.value,
    about: formElementProfile.description.value,
  })
    .then((userInfo) => {
      profileName.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closeModal(editPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(
        false,
        formElementProfile.querySelector(".popup__button")
      );
    });
};
formElementProfile.addEventListener("submit", handleFormEditSubmit);

const handleAvatarFormSubmit = async (evt) => {
  evt.preventDefault();
  renderLoading(true, formElementAvatar.querySelector(".popup__button"));
  editAvatar(formElementAvatar.link.value)
    .then((userInfo) => {
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
      closeModal(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, formElementAvatar.querySelector(".popup__button"));
    });
};
formElementAvatar.addEventListener("submit", handleAvatarFormSubmit);

const handleAddCardFormSubmit = async (evt) => {
  evt.preventDefault();
  renderLoading(true, createCardPopup.querySelector(".popup__button"));

  const name = formElementCard.elements.name.value;
  const link = formElementCard.elements.link.value;
  createNewCard({ name, link })
    .then((card) => {
      const newCard = generateNewCard(
        card,
        userId,
        confirmDeleteCard,
        likeAnimation,
        openPopupImg
      );
      cardsContainer.prepend(newCard);
      closeModal(createCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, formElementCard.querySelector(".popup__button"));
    });
};
formElementCard.addEventListener("submit", handleAddCardFormSubmit);

editBtn.addEventListener("click", function () {
  clearValidation(formElementProfile, validationConfig);
  formElementProfile.elements.name.value = profileName.textContent;
  formElementProfile.elements.description.value =
    profileDescription.textContent;
  openModal(editPopup);
});

plusBtn.addEventListener("click", function () {
  formElementCard.reset();
  clearValidation(formElementCard, validationConfig);
  openModal(createCardPopup);
});

buttonEditAvatar.addEventListener("click", (evt) => {
  formElementAvatar.reset();
  clearValidation(formElementAvatar, validationConfig);
  openModal(avatarPopup);
});

allPopup.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  });
});

enableValidation(validationConfig);
