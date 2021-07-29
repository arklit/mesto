import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import {
  validationConfig,
  initialCards,
  popupEditProfile,
  btnEditUserProfileOpen,
  nameInput,
  bioInput,
  popupDeleteSubmit,
  popupEditSubmit,
  popupAvatarSubmit,
  popupCardSubmit,
  userNameContent,
  userBioContent,
  popupCard,
  btnAddCardPopup,
  popupTypeImage,
  btnOpenAvatarPopup,
  popupAvatar,
  popupDelete,
  userAvatar
} from '../utils/constants.js';
import Api from '../components/Api.js';

const userInfo = new UserInfo(userNameContent,userBioContent, userAvatar);
const popupWithImage = new PopupWithImage(popupTypeImage);
const formEditUserValidate = new FormValidator(validationConfig, popupEditProfile);
const formAddCardValidate = new FormValidator(validationConfig, popupCard);
const formAvatarValidate = new FormValidator(validationConfig, popupAvatar)
formAvatarValidate.enableValidation();
formEditUserValidate.enableValidation();
formAddCardValidate.enableValidation();

const api = new Api({
  url: `https://mesto.nomoreparties.co/v1/cohort-26`,
  headers: {
    authorization: '57774d67-b59e-4768-b818-6c6912b25ddb',
    'Content-Type': 'application/json'
  }
})

function createCard(item) {
  const userId = userInfo.getId()
  const card = new Card(item, {
    handlerImageClick: (name, link) => {
      popupWithImage.open({name, link});
    },
    handlerImageDelete: (cardId, elem) => {
      popupWithDelete.open(cardId, elem);
    },
    handlerImageLike: (cardId) => {
      api.likeCard(cardId)
        .then(({likes}) => {
          card.updateLikeCount(likes);
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handlerImageDislike: (cardId) => {
      api.removeLike(cardId)
        .then(({likes}) => {
          card.updateLikeCount(likes);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, '.template', userId );
  return card.generateCard();
};

const cardList = new Section( {
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement, 'append');
  }
}, '.elements')

const popupUser = new PopupWithForm(popupEditProfile, {
  submitHandler: (data) => {
    popupEditSubmit.textContent = "Сохранение..."
    api.editProfile(data.name, data.about)
      .then(result => {
        userInfo.setUserInfo(result.name, result.about)
        popupUser.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditSubmit.textContent = "Сохранить"
      })
  }
});

const popupAddCard = new PopupWithForm(popupCard, {
  submitHandler: (data) => {
    popupCardSubmit.textContent = "Создание..."
    api.addCard(data.title, data.link)
      .then(result => {
        const element = createCard(result)
        cardList.addItem(element, 'prepend');
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupCardSubmit.textContent = "Создать"
      })
  }
});

const popupWithDelete = new PopupWithDelete(popupDelete, {
  submitHandler: (cardId) => {
    popupDeleteSubmit.textContent = "Удаление..."
    api.deleteCard(cardId)
      .then(() => {
        popupWithDelete.cardElement.remove()
        popupWithDelete.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupDeleteSubmit.textContent = "Да"
      })
    }
});

const popupWithAva = new PopupWithForm(popupAvatar, {
  submitHandler: ({link}) => {
    popupAvatarSubmit.textContent = "Сохранение..."
    api.updateAvatar(link)
      .then(() => {
        userInfo.setAvatar(link);
        popupWithAva.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupAvatarSubmit.textContent = "Сохранить"
      })
  }
})

Promise.all([ api.getUserInfo(), api.getInitialCards() ])
  .then(([ userData, cards ]) => {
    userInfo.setUserInfo(userData.name, userData.about, userData._id);
    userInfo.setAvatar(userData.avatar)
    cardList.renderer(cards);
  })
  .catch(error => console.log(error))

function openPopupAddCard() {
  formAddCardValidate.hideErrorForm();
  popupAddCard.open();
}

function openPopupUser() {
 const profileInfoHandle = userInfo.getUserInfo();
 nameInput.value = profileInfoHandle.name;
 bioInput.value = profileInfoHandle.about;
 formEditUserValidate.hideErrorForm();
 popupUser.open();
}

btnEditUserProfileOpen.addEventListener('click', openPopupUser);
btnAddCardPopup.addEventListener('click', openPopupAddCard)
btnOpenAvatarPopup.addEventListener('click', () => {
  formAvatarValidate.hideErrorForm();
  popupWithAva.open();
})

popupWithImage.setEventListeners();
popupUser.setEventListeners();
popupAddCard.setEventListeners();
popupWithAva.setEventListeners();
popupWithDelete.setEventListeners();
