let popup = document.querySelector('.popup');
let openPopupBtn = document.getElementById('open_popup_btn');
let closePopupBtn = document.querySelector('.popup__closeButton');
let popupOverlay = document.querySelector('.popup__overlay');
let nameInput = document.querySelector('.popup__name');
let bioInput = document.querySelector('.popup__bio');
let nametxt = document.querySelector('.profile__name');
let biotxt = document.querySelector('.profile__bio');
let formElement = document.querySelector('.popup__form');

function openPopup() {
 popup.classList.add('popup__opened');
 nameInput.value = nametxt.textContent;
 bioInput.value = biotxt.textContent;
}
function closePopup() {
popup.classList.remove('popup__opened');
}
openPopupBtn.addEventListener('click', function(event) {
  openPopup();
});

closePopupBtn.addEventListener('click', function() { closePopup(); });
popupOverlay.addEventListener('click', function() { closePopup(); });

function formSubmitHandler (evt) {
    evt.preventDefault();
    nametxt.textContent = nameInput.value;
    biotxt.textContent = bioInput.value;
    closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);
