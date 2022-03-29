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
  const placesImage = cardElement.querySelector('.places__image');
  placesImage.src = item.link;
  placesImage.alt = item.name;

  // Удаление карточки
  const basket = cardElement.querySelector('.places__basket');
  basket.addEventListener('click', (e) => {
    cardElement.remove();
  });

  // Лайк
  const like = cardElement.querySelector('.places__like'); 
  like.addEventListener('click', (e) => {
    like.classList.toggle('places__like_active');
  });

  // Увеличение картинки
  placesImage.addEventListener('click', (e) => {
    openPopup(popupImagemagnify);
    imageOfPopup.src = item.link;
    imageOfPopup.alt = item.name;
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
  document.addEventListener('keydown', closeByEscape); 
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}

//-------------Добавление карточки НОВОЕ МЕСТО------------------
const formPlace = document.querySelector('.form-place');
const namePlace = formPlace.querySelector('.popup__name-newplace');
const imagePlace = formPlace.querySelector('.popup__linkimage');
const submitButton = formPlace.querySelector('.popup__button-save');

function adNewplace(e) { // добавление инфы
  e.preventDefault();
  if (namePlace.value === '' || imagePlace.value === '') {
    return;
  }
  closePopup(popupNewplace);
  const newCard = createCard({name: namePlace.value, link: imagePlace.value});
  placeWrapper.prepend(newCard);
  formPlace.reset();
  disableInput();
}
formPlace.addEventListener("submit", adNewplace); // сохранение инфы

//-------disabled --------------------------------------------------
function disableInput() {
  submitButton.classList.add('popup__button-save_inactive');
  submitButton.setAttribute('disabled', true);
}

//---------------попап НОВОЕ МЕСТО---------------------------------
const popupNewplace = document.querySelector('.popup-newplace');
const buttonNewplace = document.querySelector('.profile__button');
const placeTitle = document.querySelector('.places__title');
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


//--------------Закрытие на оверлее-----------
const popups = document.querySelectorAll('.popup');

popups.forEach(function(popup) {
  const popupWrapper = popup.querySelector('.popup__container');
  popupWrapper.addEventListener('click', (event) => {
    event.stopPropagation();
  });
  popup.addEventListener('click', () => {
    closePopup(popup);
   });
});

 //----------Закрытие попапов на ESC--------
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened'); 
    closePopup(popupOpened);
  }
}









//--------мои_заметки-------

/*Сабмит и кнопка закрытия вложены в оверлей, поэтому сначала слушатель срабатывает на них, потом на родителе. 
А если ты кликаешь на родителе, то только его слушатель срабатывает, соответственно. Все элементы, вложенные в оверлей, будут вызывать его событие клика, 
в т.ч. контейнер, но для избежания закрытия в функции есть проверка, на кого было кликнуто (отредактировано)*/

/*const popupOpened = document.querySelector('.popup_opened');
popupOpened.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closePopup();
    }
  });*/

//Надо найти popup__opened через queryselector как обычно,  и передать эту переменную в функцию closepopup. Массив и перебор не надо

 //По заданию надо, чтобы слушатель вешался на открытие попапа и убирался на закрытие попапа.



 //-------ДОРАБОТКИ------
 /*buttonExitNewplace.addEventListener('click', () => { 
  Если будет интересно, посмотрите, как можно объединить обработчики оверлея и крестиков:
    const popups = document.querySelectorAll('.popup')
  
        popups.forEach((popup) => {
            popup.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains('popup_opened')) {
                    closePopup(popup)
                }
            })
        }) 
  Для этого как раз и создаются универсальные классы для элементов (в данном случае класс popup).
  Находим все попапы в проекте и пробегаемся по ним, навешивая обработчик.
  А вот еще магия общих классов:
   if (evt.target.classList.contains('popup__close')) {
                  closePopup(popup)
                } 
  Можно добавить проверку, нажали на крестик или нет,  и закрывать попап.
  У крестика тоже универсальный класс popup__close 
  И теперь можно удалить кучу ненужного кода, который обрабатывал клики по кнопкам крестиков, сам поиск этих кнопок вверху файла и тд. Добавляйте хоть 100 попапов - код будет работать для всех.
   const popups = document.querySelectorAll('.popup')
  
        popups.forEach((popup) => {
            popup.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains('popup_opened')) {
                    closePopup(popup)
                }
                if (evt.target.classList.contains('popup__close')) {
                  closePopup(popup)
                }
            })
        })
   
  Обратите внимание, что нужно использовать событие 'mousedown', а не click, чтобы не закрыть случайно попап по оверлею, если нажать мышкой внутри попапа, а потом, не разжимая, передвинуть курсор на оверлей. Такой баг появляется с событием click.
  */