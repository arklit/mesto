class Card {
  constructor({name, link, owner, _id, likes}, {
    handlerImageClick,
    handlerImageLike,
    handlerImageDislike,
    handlerImageDelete
  }, cardSelector, userId ) {
    this._name = name;
    this._image = link;
    this._templateElement = document.querySelector(cardSelector);
    this._cardImage = ".element__photo";
    this._cardLike = ".element__like";
    this._cardDelete = ".element__trash";
    this._cardTitle = ".element__name";
    this._card = ".element";
    this._element = this._getTemplate();
    this._likes = likes;
    this._id = _id;
    this._owner = owner._id;
    this._userId = userId;
    this._handlerImageClick = handlerImageClick;
    this._handlerImageLike = handlerImageLike;
    this._handlerImageDislike = handlerImageDislike;
    this._handlerImageDelete = handlerImageDelete;
    this._cardLikeElement = this._element.querySelector(this._cardLike);
    this._cardElement = this._element.querySelector(this._cardImage);
    this._cardTrash = this._element.querySelector(this._cardDelete);

  }
  _getTemplate() {
    const cardElement = this._templateElement.content.children[0].cloneNode(true);
    return cardElement;
}
  generateCard() {
    this._setEventListeners();
    this.updateLikeCount();
    this._cardElement.src = this._image;
    this._cardElement.alt = this._name;
    this._element.querySelector(this._cardTitle).textContent = this._name;

    if (this._userId === this._owner) {
      this._element.querySelector(this._cardDelete).classList.add('element__trash_active');
    }
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
          this._element.querySelector(this._cardLike).classList.toggle("element__like_active");
          return;
      }
    })
    return this._element;
  }
  _setEventListeners() {
    this._cardTrash.addEventListener('click', () => this._handlerDelete());
    this._cardElement.addEventListener('click', () => this._handlerImageClick(this._name, this._image));
    this._cardLikeElement.addEventListener('click', () => {
      const swap = this._element.querySelector(this._cardLike).classList.contains("element__like_active");
      if(swap) {
        this._dislikeCard();
      }   else {
        this._likeCard();
      }
    });
};

  updateLikeCount() {
    this._element.querySelector('.element__like-quantity').textContent = this._likes.length;
  }

 _likeCard() {
   this._handlerImageLike(this._id);
   this._element.querySelector(this._cardLike).classList.toggle("element__like_active");
}
 _dislikeCard() {
   this._handlerImageDislike(this._id);
   this._element.querySelector(this._cardLike).classList.toggle("element__like_active");
 }
_handlerDelete() {
  this._handlerImageDelete(this._id, this._element);
}

}
export {Card};
