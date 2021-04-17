  const validationConfig = ({
  formElement: '.popup__form',
  formProfile: '.popup__form[name="profile-form"]',
  formCard: '.popup__form[name="picture-add-form"]',
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
});

const formElement = document.querySelector(validationConfig.formElement);
const formInput = formElement.querySelector(validationConfig.inputElement);

const showInputError = (formElement, formInput, errorMessage) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  setCustomError(formInput);
  formInput.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};
const hideInputError = (formElement, formInput) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, formInput) => {
  if(!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement,formInput);
  }
}
const setEventListeners = (formElement) => {
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

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formElement));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  })
}
enableValidation();
function hasInvalidInput(inputList) {
  return inputList.some((formInput) =>{
    return !formInput.validity.valid
  });
}
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled',true);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}
// function handleFormSubmit(event) {
//   event.preventDefault();
//   const form = event.currentTarget;
//   const isValid = form.checkValidity();
//     if (isValid) {
//         form.reset();
//     }
//     else {
//       toggleSubmitButtonState(form);
//     }
// }

// function setFieldError(field) {
//   const span = field.nextElementSibling;
//   span.textContent = field.validationMessage;
// };

// function toggleSubmitButtonState(form) {
// const button = form.querySelector(validationConfig.submitButtonSelector);
// const isValid = form.checkValidity();
// if (isValid) {
//   button.removeAttribute('disabled');
//   button.classList.remove(validationConfig.inactiveButtonClass);
// } else {
//   button.setAttribute('disabled', true);
//   button.classList.add(validationConfig.inactiveButtonClass);
// }
// }

function setCustomError(formInput) {
  const validity = formInput.validity;
  formInput.setCustomValidity('');
  if (validity.tooShort || validity.tooLong) {
      const current = formInput.value.length;
      const min = formInput.getAttribute('minlength');
      const max = formInput.getAttribute('maxlength')
      formInput.setCustomValidity(`Строка слишком короткая. Введено ${current} символов, а должно быть от ${min} до ${max}`);
  }
  else if (validity.typeMismatch && formInput.type === 'url') {
      formInput.setCustomValidity('Здесь должна быть ссылка');
  }
}

// const formProfile = document.querySelector(validationConfig.formProfile);
// formProfile.addEventListener('submit', handleFormSubmit)
// formProfile.addEventListener('input', function (event) {
//  const input = event.target;
//  setCustomError(input);
//  setFieldError(input);
//  toggleSubmitButtonState(formProfile);
// });

// const formCard = document.querySelector(validationConfig.formCard);
// formCard.addEventListener('submit', handleFormSubmit)
// formCard.addEventListener('input', function (event) {
//  const input = event.target;
//  setCustomError(input);
//  setFieldError(input);
//  toggleSubmitButtonState(formCard);
// });

