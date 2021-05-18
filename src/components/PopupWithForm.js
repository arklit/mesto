import Popup from './Popup.js'
export default class PopupWithForm extends Popup{
  constructor(popupElement, {submitHandler}) {
    super(popupElement);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
   this._inputValues = {};
   this._inputList.forEach(input => this._inputValues[input.name] = input.value)
   return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues())
    });
  };

  close() {
    this._form.reset();
    super.close()
  }
};
