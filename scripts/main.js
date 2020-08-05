let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__form-item_type_name');
let jobInput = formElement.querySelector('.popup__form-item_type_job');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');

let popupOpen = function() {
  popup.classList.add('popup_opened'); 

  nameInput.value = profileName.textContent
  jobInput.value = profileOccupation.textContent
}

let popupClose = function() {
  popup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;

  popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);