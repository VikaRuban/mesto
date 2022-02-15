const buttonSave = document.querySelector('.popup__button-save');
buttonSave.addEventListener('click', function () {
  let popupName = document.querySelector('.popup__name');
  let popupDescription = document.querySelector('.popup__description');
  let profileName = document.querySelector('.profile__name');
  let profileDescription = document.querySelector('.profile__description');
  if (popupName.value !== '') {
    profileName.textContent = popupName.value;
    }
  if (popupDescription.value !== '') {
    profileDescription.textContent = popupDescription.value;
    }
  /*закрыть попап через save*/
  let popup = document.querySelector('.popup');
  popup.classList.remove("popup_opened");
  }
)
/*закрыть попап через х*/
let buttonExit = document.querySelector('.popup__button-exit')
buttonExit.addEventListener('click', function () {
  let popup = document.querySelector('.popup');
  popup.classList.remove("popup_opened");
  }
)
/*открыть попап через edit*/
let buttonProfileEdit = document.querySelector('.profile__button-edit');
buttonProfileEdit.addEventListener('click', function () { 
  let popup = document.querySelector('.popup');
  popup.classList.add("popup_opened");
  }
)