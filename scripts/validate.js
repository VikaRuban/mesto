const getErrorElement = (inputElement, settings) => {
  return inputElement.closest(`.${settings.section}`).querySelector(`.${settings.inputError}`);
};

const showError = (inputElement, errorMessage, settings) => {
  const errorElement = getErrorElement(inputElement, settings);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.inputErrorActive);
};

const hideError = (inputElement, settings) => {
  const errorElement = getErrorElement(inputElement, settings);
  errorElement.textContent = '';
  errorElement.classList.remove(settings.inputErrorActive);
};

const getErrorMessage = (inputElement) => {
  const defaultErrorHandler = (inputElement) => inputElement.validationMessage;
  const linkErrorHandler = () => 'пожалуйста, введите ссылку на изображение';

  const errorHandlers = {
    link: linkErrorHandler,
    DEFAULT: defaultErrorHandler,
  };

  const handler = errorHandlers[inputElement.name] || errorHandlers.DEFAULT; 
  return handler(inputElement);
};

const checkValidity = (inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showError(inputElement, getErrorMessage(inputElement), settings);
  } else {
    hideError(inputElement, settings);
  }
};

const toggleButtonState = (inputList, submitButtonElement, settings) => {
  const hasInvalidInput = Array.from(inputList).some((inputElement) => !inputElement.validity.valid);

  if (hasInvalidInput) {
    submitButtonElement.classList.add(settings.buttonSaveInactive);
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.classList.remove(settings.buttonSaveInactive);
    submitButtonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = formElement.querySelectorAll(`.${settings.input}`);
  const submitButtonElement = formElement.querySelector(`.${settings.buttonSave}`);

  toggleButtonState(inputList, submitButtonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidity(inputElement, settings);
      toggleButtonState(inputList, submitButtonElement, settings);
    }); 
  });
};

const enableValidation = (settings) => {
  const formList = document.querySelectorAll(`.${settings.form}`); // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  formList.forEach((form) => { // Переберём полученную коллекцию
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(form, settings); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  });
};

enableValidation({
  form: 'popup__form',
  section: 'popup__form-section',
  input: 'popup__input',
  inputError: 'popup__input-error',
  inputErrorActive: 'popup__input-error-active',
  buttonSave: 'popup__button-save',
  buttonSaveInactive: 'popup__button-save_inactive'
});