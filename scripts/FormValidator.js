class FormValidator {
  constructor(validationConfig, formElement) {
    this._formElement = formElement;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._inputErrorActive = validationConfig.inputErrorActive;
    this._inputElement = validationConfig.inputElement;
    this._buttonElement = this._formElement.querySelector(validationConfig.submitButtonSelector);
  }
  _showInputError(formInput, errorMessage) {
    const errorElement = formInput.nextElementSibling;
    formInput.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorActive);
  };
  _hideInputError(formInput) {
    const errorElement = formInput.nextElementSibling;
    formInput.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._inputErrorActive);
    errorElement.textContent = "";
  };

  _checkInputValidity(formInput){
    if(!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
    this._toggleButtonState(inputList);
    inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkInputValidity(formInput);
        this._toggleButtonState(inputList);
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  _hasInvalidInput(inputList) {
    return inputList.some((formInput) =>{
      return !formInput.validity.valid
    });
  }

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._buttonElement.setAttribute('disabled',true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }
}
export {FormValidator}
