class FormValidator {
  constructor(validationConfig, formElement) {
    this._formElement = formElement;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._inputErrorActive = validationConfig.inputErrorActive;
    this._inputElement = validationConfig.inputElement;
    this._buttonElement = this._formElement.querySelector(validationConfig.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
  }

   _showInputError(formInput, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorActive);
  };
  _hideInputError(formInput) {
    const errorElement = this._formElement.querySelector(`.${formInput.id}-error`);
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
    this._toggleButtonState(this._inputList);
    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkInputValidity(formInput);
        this._toggleButtonState(this._inputList);
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

  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disbaled = true;
  }

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton();
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }
}
export {FormValidator}
