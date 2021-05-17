import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import {
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
  popupTypeImage
} from '../utils/constants.js';

const userInfo = new UserInfo(userNameContent,userBioContent);
const formEditUserValidate = new FormValidator(validationConfig, popupEditProfile);
const formAddCardValidate = new FormValidator(validationConfig, popupCard);
const popupWithImage = new PopupWithImage(popupTypeImage);

function createCard(item) {
  const card = new Card(item, '.template', {
    handlerImageClick() {
      popupWithImage.open(item.link, item.name);
    }
  } );
  const cardElement = card.generateCard();
  return cardElement
}

const cardList = new Section( {
  data: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, '.elements')

cardList.renderItems();


const popupUser = new PopupWithForm(popupEditProfile, {
  submitHandler: (item) => {
    userInfo.setUserInfo(item.name, item.biography);
    popupUser.close();
  }
});

const popupAddCard = new PopupWithForm(popupCard, {
  submitHandler: (item) => {
    const cardElement = createCard({
      name: item.title,
      link: item.link
    })
    cardList.addItem(cardElement);
    popupAddCard.close();
  }
})

function openPopupAddCard() {
  formAddCardValidate.hideErrorForm();
  popupAddCard.open();
}

function openPopupUser() {
 const profileInfoHandle = userInfo.getUserInfo();
 nameInput.value = profileInfoHandle.name;
 bioInput.value = profileInfoHandle.biography;
 formEditUserValidate.hideErrorForm();
 popupUser.open();
}

formEditUserValidate.enableValidation();
formAddCardValidate.enableValidation();
popupWithImage.setEventListeners();
popupUser.setEventListeners();
popupAddCard.setEventListeners();
btnEditUserProfileOpen.addEventListener('click', openPopupUser);
btnAddCardPopup.addEventListener('click', openPopupAddCard)
