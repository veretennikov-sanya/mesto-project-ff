//функция открытия модального окна
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", pressEsc);
  popup.addEventListener("click", clickClose);
  popup.addEventListener("mousedown", clickOverlay);
}

//функция закрытия модального окна
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", pressEsc);
  popup.removeEventListener("click", clickClose);
  popup.removeEventListener("mousedown", clickOverlay);
}

function pressEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function clickClose(evt) {
  if (evt.target.classList.contains("popup__close"))
    closeModal(evt.currentTarget);
}

function clickOverlay(evt) {
  if (evt.currentTarget === evt.target) closeModal(evt.currentTarget);
}
