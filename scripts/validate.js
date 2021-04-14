  const enableValidation= ({
  formProfile: '.popup__form[name="profile-form"]',
  formCard: '.popup__form[name="picture-add-form"]',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  activeButtonClass: 'popup__button_valid',
  inputErrorClass: 'popup__error'
});

const formProfile = document.querySelector(enableValidation.formProfile);
formProfile.addEventListener('submit', handleFormSubmit)
formProfile.addEventListener('input', function (event) {
 const input = event.target;
 setCustomError(input);
 setFieldError(input);
 setSubmitButtonState(formProfile);
});

const formCard = document.querySelector(enableValidation.formCard);
formCard.addEventListener('submit', handleFormSubmit)
formCard.addEventListener('input', function (event) {
 const input = event.target;
 setCustomError(input);
 setFieldError(input);
 setSubmitButtonState(formCard);
});

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const isValid = form.checkValidity();
    if (isValid) {
        form.reset();
    };
}

function setFieldError(field) {
  const span = field.nextElementSibling;
  span.textContent = field.validationMessage;
};

function setSubmitButtonState(form) {
const button = form.querySelector(enableValidation.submitButtonSelector);
const isValid = form.checkValidity();
if (isValid) {
  button.removeAttribute('disabled');
  button.classList.add(enableValidation.activeButtonClass);
  button.classList.remove(enableValidation.inactiveButtonClass);
} else {
  button.setAttribute('disabled', true);
  button.classList.remove(enableValidation.activeButtonClass);
  button.classList.add(enableValidation.inactiveButtonClass);
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
