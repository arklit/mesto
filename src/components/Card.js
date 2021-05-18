class Card {
  constructor(item, cardSelector, { handlerImageClick } ) {
    this._name = item.name;
    this._image = item.link;
    this._cardSelector = cardSelector;
    this._handlerImageClick = handlerImageClick;
  }
  _getTemplate() {
    const element = this._cardSelector.content.querySelector('.element').cloneNode(true);
    return element;
 }
  generateCard() {
    this._element = this._getTemplate();
    this._elementPhoto = this._element.querySelector('.element__photo');
    this._elementName = this._element.querySelector('.element__name');
    this._like = this._element.querySelector('.element__like');
    this._trash = this._element.querySelector('.element__trash');
    this._setEventListeners();
    this._elementPhoto.src = this._image;
    this._elementName.textContent = this._name;
    this._elementPhoto.alt = this._name;
    return this._element;
}
  _setEventListeners() {
    this._like.addEventListener('click', () => this._handlerLike());
    this._trash.addEventListener('click', () => this._handlerDelete());
    this._elementPhoto.addEventListener('click', () => this._handlerImageClick());
};
 _handlerLike() {
  this._like.classList.toggle("element__like_active");
}
_handlerDelete() {
  this._element.remove();
}

}
export {Card};
