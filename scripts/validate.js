const getErrorElement = (inputElement) => {
  return inputElement.closest('.popup__form-section').querySelector('.popup__input-error');
};

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = getErrorElement(inputElement);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('.popup__input-error-active');
};

const hideError = (formElement, inputElement) => {
  const errorElement = getErrorElement(inputElement);
  errorElement.textContent = '';
  errorElement.classList.remove('.popup__input-error-active');
  errorElement.classList.add();
};

const getErrorMessage = (inputElement) => {
  const defaultErrorHandler = (inputElement) => inputElement.validationMessage;

  const linkErrorHandler = (inputElement) =>
  'пожалуйста, введите ссылку на изображение';
  const errorHandlers = {
    link: linkErrorHandler,
    DEFAULT: defaultErrorHandler,
  };
  const ErrorHandler = errorHandlers[inputElement.name] || errorHandlers.DEFAULT; 

  return ErrorHandler(inputElement);
};

const checkValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;
  if (isInputNotValid) {
    const errorMessage = getErrorMessage(inputElement);
    showError(formElement, inputElement, errorMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, submitButtonElement) => {
  const inputElements = Array.from(inputList)
  const hasInvalidInput = inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  console.log(submitButtonElement);
  if (hasInvalidInput) {
    submitButtonElement.classList.add('popup__button-save_inactive');
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.classList.remove('popup__button-save_inactive');
    submitButtonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll('.popup__input');
  const submitButtonElement = formElement.querySelector('.popup__button-save');

  const inputListIterator = (inputElement) => {
    const handleInput = (event) => {
      checkValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButtonElement);
    };
   inputElement.addEventListener('input', handleInput); 
  };

  toggleButtonState(inputList, submitButtonElement);
  inputList.forEach(inputListIterator);
};
 

const enableValidation = () => {
  const formList = document.querySelectorAll('.popup__form'); // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formListIterator = (formElement) => { // Переберём полученную коллекцию
    const handleFormSubmit = (event) => {
      event.preventDefault();
    }
    formElement.addEventListener('submit', handleFormSubmit);

    setEventListeners(formElement); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  };


  formList.forEach(formListIterator);
};
enableValidation();