import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupImg = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__image-caption');
  }

  open(link, name) {
    super.open();
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._caption.textContent = name;
  }
}
