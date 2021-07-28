import Popup from "./Popup.js";
export default class PopupWithDelete extends Popup {
  constructor(popupElement, {submitHandler}) {
    super(popupElement)
    this._submitHandler = submitHandler;
  }

  open(cardId, element) {
    super.open();
    this._cardId = cardId;
    this.cardElement = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._cardId);
    })
  }
}
