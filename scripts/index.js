const popupEditProfile = document.querySelector('.popup_edit-profile');
const btnEditUserProfileOpen = document.querySelector('.profile__edit-button');
const btnEditUserProfileClose = popupEditProfile.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__text_type_name');
const bioInput = document.querySelector('.popup__text_type_bio');
const userNameContent = document.querySelector('.profile__name');
const userBioContent = document.querySelector('.profile__bio');
const formEditProfile = document.querySelector('.popup__form[name="profile-form"]');
const btnLike = document.querySelectorAll('.element__like');
const popupCard = document.querySelector('.popup_card');
const btnPopupCardClose = popupCard.querySelector('.popup__close-button');
const popupEditBtn = document.querySelector('.profile__add-button');
const cardNameInput = popupCard.querySelector('.popup__text_card_name');
const cardImageInput = popupCard.querySelector('.popup__text_card_img');
const popupTypeImage = document.querySelector('.popup_type-image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__image-caption');
const btnPopupImageClose = popupTypeImage.querySelector('.popup__close-button');
const template = document.querySelector('template').content.querySelector('.element');
const elements = document.querySelector('.elements');
const cardFormAdd = popupCard.querySelector('.popup__form[name="picture-add-form"]');
const handlerAddCardFormSubmit = e => {
  e.preventDefault();
  const inputValues = {
  name: cardNameInput.value,
  link: cardImageInput.value,
  };
 const cardElement = createCard(inputValues);
 elements.prepend(cardElement);
  closePopup(popupCard);
  cardImageInput.value = '';
  cardNameInput.value = '';
};

function keyHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
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

function handlerImageClick(evt) {
  openPopup(popupTypeImage);
  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.name;
  popupImage.alt = evt.target.name;
};


function createCard(item) {
  const element = template.cloneNode(true);
 const elementName = element.querySelector('.element__name');
 const elementImage = element.querySelector('.element__photo');
 const btnLike = element.querySelector('.element__like');
 const btnRemove = element.querySelector('.element__trash');
 const img = element.querySelector('.element__photo');
 img.name = item.name;
 elementName.textContent = item.name;
 elementImage.src = item.link;
 elementImage.alt = item.name;
 btnLike.addEventListener('click', e => btnLike.classList.toggle('element__like_active'));
 btnRemove.addEventListener('click', e => element.remove());
 img.addEventListener('click',handlerImageClick);
 return element;
};

popupEditBtn.addEventListener('click', function () {
openPopup(popupCard);
  cardImageInput.value = '';
  cardNameInput.value = '';
});
btnPopupCardClose.addEventListener('click', function () {
  closePopup(popupCard);
  cardImageInput.value = '';
  cardNameInput.value = '';
});
btnEditUserProfileClose.addEventListener('click', function () {
 closePopup(popupEditProfile)
 nameInput.value = '';
 bioInput.value='';
});
formEditProfile.addEventListener('submit', handlereditProfileFormSubmit);
btnEditUserProfileOpen.addEventListener('click', () => openPopupEdit());
btnPopupImageClose.addEventListener('click', () => closePopup(popupTypeImage));
document.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
});

cardFormAdd.addEventListener('submit', handlerAddCardFormSubmit);

initialCards.forEach((card) => {
 const cardElement = createCard(card);
 elements.append(cardElement);
});
