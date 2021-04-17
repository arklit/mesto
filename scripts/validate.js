  const validationConfig = ({
  formElement: '.popup__form',
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: "popup__input_type_error",
  inputErrorActive: "popup__input-error_active"
});

const formElement = document.querySelector(validationConfig.formElement);
const formInput = formElement.querySelector(validationConfig.inputElement);

const showInputError = (formElement, formInput, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.inputErrorActive);
};
const hideInputError = (formElement, formInput, validationConfig) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.inputErrorActive);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, formInput) => {
  if(!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement,formInput);
  }
}
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputElement));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', function () {
      checkInputValidity(formElement, formInput);
      toggleButtonState(inputList,buttonElement);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formElement));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  })
}

function hasInvalidInput(inputList) {
  return inputList.some((formInput) =>{
    return !formInput.validity.valid
  });
}
function toggleButtonState (inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled',true);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

enableValidation(validationConfig);
