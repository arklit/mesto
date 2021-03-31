const popup = document.querySelector('.popup');
const openPopupBtn = document.getElementById('open_popup_btn');
const closePopupBtn = document.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__text_type_name');
const bioInput = document.querySelector('.popup__text_type_bio');
const nametxt = document.querySelector('.profile__name');
const biotxt = document.querySelector('.profile__bio');
const formElement = document.querySelector('.popup__form');
const likeBtn = document.querySelectorAll('.element__like');
const popupCard = document.querySelector('.popup_card');
const closePopupCardBtn = popupCard.querySelector('.popup__close-button');
const popupEditBtn = document.querySelector('.profile__add-button');
const cardNameInput = popupCard.querySelector('.popup__text_card_name');
const cardImageInput = popupCard.querySelector('.popup__text_card_img');
const popupTypeImage = document.querySelector('.popup_type-image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__image-caption');
const closePopupImageBtn = popupTypeImage.querySelector('.popup__close-button');

function openPopupcard() {
  popupCard.classList.add('popup_opened');
};

function closePopupcard() {
  popupCard.classList.remove('popup_opened');
};

function openPopupImage() {
  popupTypeImage.classList.add('popup_opened');
};
function closePopupImage() {
  popupTypeImage.classList.remove('popup_opened');
}

function openPopup() {
 popup.classList.add('popup_opened');
 nameInput.value = nametxt.textContent;
 bioInput.value = biotxt.textContent;
}

function closePopup() {
popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nametxt.textContent = nameInput.value;
    biotxt.textContent = bioInput.value;
    closePopup();
}
popupEditBtn.addEventListener('click', () => openPopupcard());
closePopupCardBtn.addEventListener('click', ()=> closePopupcard());
closePopupBtn.addEventListener('click', () => closePopup());
formElement.addEventListener('submit', formSubmitHandler);
openPopupBtn.addEventListener('click', () => openPopup());
closePopupImageBtn.addEventListener('click', () => closePopupImage());


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const elements = document.querySelector('.elements');
const addCard = popupCard.querySelector('.popup__form');



const imageFormSumbitHandler = e => {
  e.preventDefault();
  const inputValues = {
  name: cardNameInput.value,
  link: cardImageInput.value,
  };
  insertElements(inputValues);
  closePopupcard();
};

addCard.addEventListener('submit', imageFormSumbitHandler,);

function insertElements(item) {
  const element = template.cloneNode(true);
 const elementName = element.querySelector('.element__name').textContent = item.name;
 const elementImage = element.querySelector('.element__photo').src = item.link;
 elements.append(element);
 const likeBtn = element.querySelector('.element__like');
 likeBtn.addEventListener('click', e => likeBtn.classList.toggle('element__like_active'));
 const removeBtn = element.querySelector('.element__trash');
 removeBtn.addEventListener('click', e => element.remove());
  function imageClickHandler(e) {
    openPopupImage();
    popupImage.src = item.link;
    popupCaption.textContent = item.name;
  };
  const img = element.querySelector('.element__photo');
  img.addEventListener('click',imageClickHandler);
};

const template = document.querySelector('template').content.querySelector('.element')

initialCards.forEach(insertElements);
