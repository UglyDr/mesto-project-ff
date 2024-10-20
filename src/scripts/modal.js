function openPopup(elem) {
  elem.classList.add("popup_is-animated");
  setTimeout(() => {
    elem.classList.add("popup_is-opened");
  }, 100);
  document.addEventListener("keydown", closePopupOnKey);
  document.addEventListener("click", closePopupOnOverley);
}

function closePopup(elem) {
  elem.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupOnKey);
  document.removeEventListener("click", closePopupOnOverley);
}

function closePopupOnKey(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

function closePopupOnOverley(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closePopup(event.target);
  }
}

export { openPopup, closePopup };
