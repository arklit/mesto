class Card {
  constructor(item, cardSelector, { handlerImageClick } ) {
    this._name = item.name;
    this._image = item.link;
    this._cardSelector = cardSelector;
    this._handlerImageClick = handlerImageClick;
  }
  _getTemplate() {
    const element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return element;
 }
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => this._handlerLike());
    this._element.querySelector('.element__trash').addEventListener('click', () => this._handlerDelete());
    this._element.querySelector('.element__photo').addEventListener('click', () => this._handlerImageClick());
};
 _handlerLike() {
  this._element.querySelector(".element__like").classList.toggle("element__like_active");
}
_handlerDelete() {
  this._element.remove();
}
  generateCard() {
     this._element = this._getTemplate();
     this._setEventListeners();
     this._element.querySelector('.element__photo').src = this._image;
     this._element.querySelector('.element__name').textContent = this._name;
     this._element.querySelector('.element__photo').alt = this._name;
     return this._element;
 }
}
export {Card};
