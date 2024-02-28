function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", pressEsc);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", pressEsc);
}

function pressEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_is-opened");
    closeModal(popupOpened);
  }
}

export { openModal, closeModal };