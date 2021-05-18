const popupEditProfile = document.querySelector('.popup_edit-profile');
const btnEditUserProfileOpen = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__text_type_name');
const bioInput = document.querySelector('.popup__text_type_bio');
const userNameContent = document.querySelector('.profile__name');
const userBioContent = document.querySelector('.profile__bio');
const popupCard = document.querySelector('.popup_card');
const btnAddCardPopup = document.querySelector('.profile__add-button');
const popupTypeImage = document.querySelector('.popup_type-image');
const elements = document.querySelector('.elements');
const template = document.querySelector('.template');

const validationConfig = ({
  formElement: '.popup__form',
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: "popup__input_type_error",
  inputErrorActive: "popup__input-error_active"
});

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
export {
  validationConfig,
  initialCards,
  popupEditProfile,
  btnEditUserProfileOpen,
  nameInput,
  bioInput,
  userNameContent,
  userBioContent,
  popupCard,
  btnAddCardPopup,
  popupTypeImage,
  elements,
  template
};
