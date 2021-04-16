  const validationConfig = ({
  formProfile: '.popup__form[name="profile-form"]',
  formCard: '.popup__form[name="picture-add-form"]',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
});

function enableValidation(validationConfig) {

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const isValid = form.checkValidity();
    if (isValid) {
        form.reset();
    }
    else {
      toggleSubmitButtonState(form);
    }
}

function setFieldError(field) {
  const span = field.nextElementSibling;
  span.textContent = field.validationMessage;
};

function toggleSubmitButtonState(form) {
const button = form.querySelector(validationConfig.submitButtonSelector);
const isValid = form.checkValidity();
if (isValid) {
  button.removeAttribute('disabled');
  button.classList.remove(validationConfig.inactiveButtonClass);
} else {
  button.setAttribute('disabled', true);
  button.classList.add(validationConfig.inactiveButtonClass);
}
}

function setCustomError(input) {
  const validity = input.validity;
  input.setCustomValidity('');
  if (validity.tooShort || validity.tooLong) {
      const current = input.value.length;
      const min = input.getAttribute('minlength');
      const max = input.getAttribute('maxlength')
      input.setCustomValidity(`Строка слишком короткая. Введено ${current} символов, а должно быть от ${min} до ${max}`);
  }
  else if (validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity('Здесь должна быть ссылка');
  }
}

const formProfile = document.querySelector(validationConfig.formProfile);
formProfile.addEventListener('submit', handleFormSubmit)
formProfile.addEventListener('input', function (event) {
 const input = event.target;
 setCustomError(input);
 setFieldError(input);
 toggleSubmitButtonState(formProfile);
});

const formCard = document.querySelector(validationConfig.formCard);
formCard.addEventListener('submit', handleFormSubmit)
formCard.addEventListener('input', function (event) {
 const input = event.target;
 setCustomError(input);
 setFieldError(input);
 toggleSubmitButtonState(formCard);
});
};

enableValidation(validationConfig);
