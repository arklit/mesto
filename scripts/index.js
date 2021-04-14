const popupEditProfile = document.querySelector('.popup_edit-profile');
const openEditUserProfileBtn = document.getElementById('open_popup_btn');
const closeEditUserProfileBtn = popupEditProfile.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__text_type_name');
const bioInput = document.querySelector('.popup__text_type_bio');
const userNameContent = document.querySelector('.profile__name');
const userBioContent = document.querySelector('.profile__bio');
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


function togglePopup(popup) {
  popup.classList.toggle('popup_opened')
};


document.addEventListener('keydown', function(evt) {
  if (evt.key === "Escape") {
    popupEditProfile.classList.remove('popup_opened');
    popupCard.classList.remove("popup_opened");
    popupTypeImage.classList.remove("popup_opened");
  };
});

document.addEventListener('click', function(evt) {
 if (evt.target.classList.contains('popup')) {
  popupEditProfile.classList.remove('popup_opened');
  popupCard.classList.remove("popup_opened");
  popupTypeImage.classList.remove("popup_opened");
 };
});

function openPopupEdit() {
  togglePopup(popupEditProfile);
 nameInput.value = userNameContent.textContent;
 bioInput.value = userBioContent.textContent;
}

function editProfileFormSubmitHandler (evt) {
    evt.preventDefault();
    userNameContent.textContent = nameInput.value;
    userBioContent.textContent = bioInput.value;
    togglePopup(popupEditProfile);
};

popupEditBtn.addEventListener('click', () => togglePopup(popupCard));
closePopupCardBtn.addEventListener('click', function () {
  togglePopup(popupCard);
  cardImageInput.value = '';
  cardNameInput.value = '';
});
closeEditUserProfileBtn.addEventListener('click', () => togglePopup(popupEditProfile));
formElement.addEventListener('submit', editProfileFormSubmitHandler);
openEditUserProfileBtn.addEventListener('click', () => openPopupEdit());
closePopupImageBtn.addEventListener('click', () => togglePopup(popupTypeImage));


const template = document.querySelector('template').content.querySelector('.element')

function imageClickHandler(evt) {
  togglePopup(popupTypeImage);
  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.name;
  popupImage.alt = evt.target.name;
 };

function createCard(item) {
  const element = template.cloneNode(true);
 const elementName = element.querySelector('.element__name');
 const elementImage = element.querySelector('.element__photo');
 const likeBtn = element.querySelector('.element__like');
 const removeBtn = element.querySelector('.element__trash');
 const img = element.querySelector('.element__photo');
 img.name = item.name;
 elementName.textContent = item.name;
 elementImage.src = item.link;
 elementImage.alt = item.name;
 likeBtn.addEventListener('click', e => likeBtn.classList.toggle('element__like_active'));
 removeBtn.addEventListener('click', e => element.remove());
 img.addEventListener('click',imageClickHandler);
 return element;
};

const elements = document.querySelector('.elements');

initialCards.forEach((card) => {
 const cardElement = createCard(card);
 elements.append(cardElement);
});

const addCardForm = popupCard.querySelector('.popup__form');

const addCardFormSubmitHandler = e => {
  e.preventDefault();
  const inputValues = {
  name: cardNameInput.value,
  link: cardImageInput.value,
  };
 const cardElement = createCard(inputValues);
 elements.prepend(cardElement);
  togglePopup(popupCard);
  cardImageInput.value = '';
  cardNameInput.value = '';
};

addCardForm.addEventListener('submit', addCardFormSubmitHandler);
