let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close-button');

let popupToggle = function() {
  popup.classList.toggle('popup_opened');
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

let formElement = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInput = formElement.querySelector('.popup__name');
  let jobInput = formElement.querySelector('.popup__job');

  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value; 
  
  let profileName = document.querySelector('.profile__name');
  let profileOccupation = document.querySelector('.profile__occupation');

  profileName.textContent = nameInputValue;
  profileOccupation.textContent = jobInputValue;
}

formElement.addEventListener('submit', formSubmitHandler);