const buttonSave = document.querySelector('.popup__button-save');
const popupName = document.querySelector('.popup__name');
const popupDescription = document.querySelector('.popup__description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const buttonExit = document.querySelector('.popup__button-exit')
const buttonProfileEdit = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const form = document.querySelector('.form');

function inputCompare (e) {
  e.preventDefault()
  if (popupName.value !== '') {
    profileName.textContent = popupName.value;
    }
  if (popupDescription.value !== '') {
    profileDescription.textContent = popupDescription.value;
    }
    popup.classList.remove("popup_opened");
}
function currentInfo() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}
function popupClose() {
  popup.classList.remove("popup_opened");
}
function popupOpen() {
  popup.classList.toggle("popup_opened");
  currentInfo(); /*добавление инфы в инпуты*/
}
form.addEventListener("submit", inputCompare); /*сохранение инфы*/
buttonExit.addEventListener('click', popupClose); /*закрыть попап через х*/
buttonProfileEdit.addEventListener('click', popupOpen) /*открыть попап через edit*/