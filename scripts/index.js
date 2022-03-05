const initialCards = [
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

/*------------------------------СОЗДАНИЕ КАРТОЧКИ---------------------------------------*/

const placeWrapper = document.querySelector('.places');
const placeTemplate = document.querySelector('#place').content;

const imageOfPopup = document.querySelector('.popup__image');
const titleOfImage = document.querySelector('.popup__image-title');

function createCard(item) {
  const cardElement = placeTemplate.querySelector('.places__place').cloneNode(true); // клонируем содержимое тега template
  cardElement.querySelector('.places__title').textContent = item.name;
  cardElement.querySelector('.places__image').src = item.link;
  cardElement.querySelector('.places__image').alt = item.name;

  // Удаление карточки
  const basket = cardElement.querySelector('.places__basket');
  basket.addEventListener('click', (e) => {
    e.stopPropagation();
    cardElement.remove();
  });

  // Лайк
  const like = cardElement.querySelector('.places__like'); 
  like.addEventListener('click', (e) => {
    e.stopPropagation();
    like.classList.toggle('places__like_active');
  });

  // Увеличение картинки
  cardElement.addEventListener('click', (e) => {
    e.stopPropagation();
    openPopup(popupImagemagnify);
    imageOfPopup.src = item.link;
    titleOfImage.textContent = item.name;
  });
  return cardElement;
}

// Отображение массива на сайте
initialCards.forEach(function(item) { 
  const newCard = createCard(item);
  placeWrapper.prepend(newCard);
});

//-------------Общие функции попапов---------------------------
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//-------------Добавление карточки НОВОЕ МЕСТО------------------
const formPlace = document.querySelector('.form-place');
const namePlace = formPlace.querySelector('.popup__name-newplace');
const imagePlace = formPlace.querySelector('.popup__linkimage');

function adNewplace(e) { // добавление инфы
  e.preventDefault();
  if (namePlace.value === '' || imagePlace.value === '') {
    return;
  }
  
  closePopup(popupNewplace);
  const newCard = createCard({name: namePlace.value, link: imagePlace.value});
  placeWrapper.prepend(newCard);
}
formPlace.addEventListener("submit", adNewplace); // сохранение инфы

//---------------попап НОВОЕ МЕСТО---------------------------------
const popupNewplace = document.querySelector('.popup-newplace');
const buttonNewplace = document.querySelector('.profile__button');
const placeTitle = document.querySelector('.places__title');
const placeLink = document.querySelector('.places__image');
const popupNameNewplace = document.querySelector('.popup__name-newplace');
const popupLinkimage = document.querySelector('.popup__linkimage');
const buttonExitNewplace = document.querySelector('.popup__button-exitnewplace');

// Слушатели Новое место
buttonNewplace.addEventListener('click', () => {
 openPopup(popupNewplace);
});
buttonExitNewplace.addEventListener('click', () => {
  closePopup(popupNewplace);
});

//---------------попап Редактировать профиль----------------------
const popupName = document.querySelector('.popup__name');
const popupDescription = document.querySelector('.popup__description');
const formProfile = document.querySelector('.form-profile');
const popupProfile = document.querySelector('.popup-profile');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const buttonEditProfile = document.querySelector('.profile__button-edit');
buttonEditProfile.addEventListener('click', () => {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
});

const buttonExitProfile = popupProfile.querySelector('.popup__button-exit');
buttonExitProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});

formProfile.addEventListener("submit", handleProfileFormSubmit); // сохранение инфы

function handleProfileFormSubmit(e) { // чтобы не записывать пустые значения
  e.preventDefault();
  if (popupName.value !== '') {
    profileName.textContent = popupName.value;
  }
  if (popupDescription.value !== '') {
    profileDescription.textContent = popupDescription.value;
  }
  closePopup(popupProfile);
}

//-----------------Закрытие попапа Картинки----------------------
const popupImagemagnify = document.querySelector('.popup-image');
const buttonImage = document.querySelector('.popup__button-image'); 
buttonImage.addEventListener('click', () => {
  closePopup(popupImagemagnify);
});