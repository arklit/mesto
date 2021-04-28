import {initialCards} from './initial-cards.js';
import {Card} from './Card.js';
import {validationConfig} from './validateConfig.js'
import {FormValidator} from './FormValidator.js'
const popupEditProfile = document.querySelector('.popup_edit-profile');
const btnEditUserProfileOpen = document.querySelector('.profile__edit-button');
const btnEditUserProfileClose = popupEditProfile.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__text_type_name');
const bioInput = document.querySelector('.popup__text_type_bio');
const userNameContent = document.querySelector('.profile__name');
const userBioContent = document.querySelector('.profile__bio');
const formEditProfile = document.querySelector('.popup__form[name="profile-form"]');
const popupCard = document.querySelector('.popup_card');
const btnPopupCardClose = popupCard.querySelector('.popup__close-button');
const popupEditBtn = document.querySelector('.profile__add-button');
const cardNameInput = popupCard.querySelector('.popup__text_card_name');
const cardImageInput = popupCard.querySelector('.popup__text_card_img');
const popupTypeImage = document.querySelector('.popup_type-image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__image-caption');
const btnPopupImageClose = popupTypeImage.querySelector('.popup__close-button');
const elements = document.querySelector('.elements');
const cardFormAdd = popupCard.querySelector('.popup__form[name="picture-add-form"]');
const formEditUserValidate = new FormValidator(validationConfig, popupEditProfile);
formEditUserValidate.enableValidation();
const formAddCardValidate = new FormValidator(validationConfig, popupCard);
formAddCardValidate.enableValidation();
const handlerAddCardFormSubmit = e => {
  e.preventDefault();
  const inputValues = {
  name: cardNameInput.value,
  link: cardImageInput.value,
  };
  const cardElement = createCard(inputValues);
  elements.prepend(cardElement);
  closePopup(popupCard);
  cardFormAdd.reset();
};
function createCard(item) {
  const card = new Card(item, '.template', handlerImageClick);
  return card.generateCard();
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};
function overleyHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
  document.addEventListener('click', overleyHandler)
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('click', overleyHandler);
};

function openPopupEdit() {
  openPopup(popupEditProfile);
 nameInput.value = userNameContent.textContent;
 bioInput.value = userBioContent.textContent;
}

function handlereditProfileFormSubmit (evt) {
    evt.preventDefault();
    userNameContent.textContent = nameInput.value;
    userBioContent.textContent = bioInput.value;
    closePopup(popupEditProfile);
};

function handlerImageClick(name, link) {
  openPopup(popupTypeImage);
  popupImage.src = link;
  popupCaption.textContent = name;
  popupImage.alt = name;
};

popupEditBtn.addEventListener('click', function () {
  cardFormAdd.reset();
  openPopup(popupCard);
});
btnPopupCardClose.addEventListener('click', function () {
  closePopup(popupCard);
  cardFormAdd.reset();
});
btnEditUserProfileClose.addEventListener('click', function () {
 closePopup(popupEditProfile);
 formEditProfile.reset();
});
formEditProfile.addEventListener('submit', handlereditProfileFormSubmit);
btnEditUserProfileOpen.addEventListener('click', openPopupEdit);
btnPopupImageClose.addEventListener('click', () => closePopup(popupTypeImage));
cardFormAdd.addEventListener('submit', handlerAddCardFormSubmit);

initialCards.forEach((item) => {
 const cardElement = createCard(item);
 elements.append(cardElement);
});
