const buttonSave = document.querySelector('.popup__button-save');
const popupName = document.querySelector('.popup__name');
const popupDescription = document.querySelector('.popup__description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const buttonExit = document.querySelector('.popup__button-exit')
const buttonProfileEdit = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');

function inputCompare (e) {
  if (popupName.value !== '') {
    profileName.textContent = popupName.value;
    }
  if (popupDescription.value !== '') {
    profileDescription.textContent = popupDescription.value;
    }
  e.preventDefault()
}
function currentInfo() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}
function popupClose() {
  popup.classList.remove("popup_opened");
}
function popupOpen() {
  popup.classList.add("popup_opened");
  currentInfo(); /*добавление инфы в инпуты*/
}
buttonSave.addEventListener('click', inputCompare); /*сохранение инфы*/
buttonSave.addEventListener('click', popupClose);  /*закрыть попап через save*/
buttonExit.addEventListener('click', popupClose); /*закрыть попап через х*/
buttonProfileEdit.addEventListener('click', popupOpen) /*открыть попап через edit*/