let initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
/*---------Отображение массива на сайте----------*/
const placeWrapper = document.querySelector('.places');
const placeTemplate = document.querySelector('#place').content; 

initialCards.forEach(function(item) {
// клонируем содержимое тега template
const placeElement = placeTemplate.querySelector('.places__place').cloneNode(true);
placeElement.querySelector('.places__title').textContent = item.name;
placeElement.querySelector('.places__image').src = item.link;
// отображаем на странице
placeWrapper.append(placeElement);
});

/*---------  Удаление карточки--------------*/
function deletePlace() {
  const baskets = document.querySelectorAll('.places__basket'); 
  baskets.forEach(item => {
    item.addEventListener('click', removePlace);
  });
}
function removePlace(event) {
  const placeElement = event.target.closest('.places__place');
  placeElement.remove();
}
deletePlace();

/*-----------------------Лайк-----------------------------------------*/
const like = document.querySelectorAll('.places__like'); 
function adLikes() {
  like.forEach(item => {
    item.addEventListener('click', adLike);
  });
}
function adLike(event) {
  const placeElement = event.target.closest('.places__like');
  placeElement.classList.toggle('places__like_active');
}
adLikes();

/*-----------------------------------------попап Редактировать профиль----------------------------------------------------------------------------------------------*/

const popupName = document.querySelector('.popup__name');
const popupDescription = document.querySelector('.popup__description');
const form = document.querySelector('.form');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const buttonProfileEdit = document.querySelector('.profile__button-edit');
const buttonExit = document.querySelector('.popup__button-exit');

/*Слушатели Редактировать профиль */
buttonProfileEdit.addEventListener('click', popupOpen) /*открыть попап через edit*/
buttonExit.addEventListener('click', popupClose); /*закрыть попап через х*/
form.addEventListener("submit", inputCompare); /*сохранение инфы*/

function currentInfo() { /*добавление инфы в инпуты*/
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}
function inputCompare (e) { /*чтобы не записывать пустые значения*/
  e.preventDefault()
  if (popupName.value !== '') {
    profileName.textContent = popupName.value;
    }
  if (popupDescription.value !== '') {
    profileDescription.textContent = popupDescription.value;
    }
    popupClose();
}
function popupClose() { /*закрыть попап*/
  popup.classList.remove("popup_opened");
}
function popupOpen() {
  popup.classList.toggle("popup_opened"); /*открыть-закрыть*/
  currentInfo(); /*добавление инфы в инпуты*/
}

/*-----------------------------------------попап НОВОЕ МЕСТО-------------------------------------------------------------------------------------------------*/

const popupNewplace = document.querySelector('.popup-newplace');
const buttonNewplace = document.querySelector('.profile__button');
const placeTitle = document.querySelector('.places__title');
const placeLink = document.querySelector('.places__image');
const popupNameNewplace = document.querySelector('.popup__name-newplace');
const popupLinkimage = document.querySelector('.popup__linkimage');
const buttonExitNewplace = document.querySelector('.popup__button-exitnewplace');

/*Слушатели Новое место*/
buttonNewplace.addEventListener('click', popupOpenNewplace) /*открыть попап Новое место*/
buttonExitNewplace.addEventListener('click', popupCloseNewplace); /*закрыть попап через х*/

function popupCloseNewplace() { /*закрыть попап*/
  popupNewplace.classList.remove("popup_opened");
}
function popupOpenNewplace() {
  popupNewplace.classList.toggle("popup_opened"); /*открыть-закрыть*/
}

/*--------------------Добавление карточки НОВОЕ МЕСТО----------------*/
const formPlace = document.querySelector('.form-place');
const namePlace = formPlace.querySelector('.popup__name-newplace');
const imagePlace = formPlace.querySelector('.popup__linkimage');

function adNewplace(e) { /*добавление инфы*/
  e.preventDefault();
  if (namePlace.value === '' || imagePlace.value === '') {
    return;
    }
    popupCloseNewplace();
  // клонируем содержимое тега template
  const placeElement = placeTemplate.querySelector('.places__place').cloneNode(true);
  placeElement.querySelector('.places__title').textContent = namePlace.value;
  placeElement.querySelector('.places__image').src = imagePlace.value;
  // отображаем на странице
  placeWrapper.prepend(placeElement);
  // callbacks
  deletePlace();
  const newImage = {name: namePlace.value, link: imagePlace.value};
  placeElement.addEventListener('click', () => {
    imageOpen(newImage);
  });
}
formPlace.addEventListener("submit", adNewplace); /*сохранение инфы*/

/*-----------------------попап УВЕЛИЧЕНИЕ КАРТИНКИ-----------------------------------------*/
const popupImagemagnify = document.querySelector('.popup-image');
const images = document.querySelectorAll('.places__image'); 
const buttonImage = document.querySelector('.popup__button-image');
function magnifyImage() { 
  images.forEach(function(item, index) {
    item.addEventListener('click', () => {  /*вешаем слушателя на каждую картинку*/
      imageOpen(initialCards[index]);
    });
  });
}
function imageOpen(image) {
  popupImagemagnify.classList.add('popup_opened'); /*открыть*/
  popupImagemagnify.querySelector('.popup__image').src = image.link;
  popupImagemagnify.querySelector('.popup__image-title').textContent = image.name;
}
magnifyImage();

buttonImage.addEventListener('click', closePopupImage); /*закрыть попап через х*/
function closePopupImage() {
popupImagemagnify.classList.remove("popup_opened");
}