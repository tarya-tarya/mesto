import {
  Card
} from './Card.js';
import {
  settings,
  FormValidator
} from './FormValidator.js';

const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__container');
const inputElement = formElement.querySelector('.popup__form-item');
const nameInput = formElement.querySelector('.popup__form-item_type_name');
const jobInput = formElement.querySelector('.popup__form-item_type_job');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const imgPopup = document.querySelector('.img-popup');
const popupList = document.querySelectorAll('.popup');
const popupOpened = document.querySelector('.popup_opened');

export function openModalWindow(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', escapePopup);
};

function closeModalWindow(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keyup', escapePopup);
};

export function escapePopup(evt) {
  if (evt.key === "Escape") {
    popupList.forEach((popupOpened) => {
      if (popupOpened.classList.contains('popup_opened')) {
        closeModalWindow(popupOpened);
      }
    })
  }
}

function openPopup(event) {
  openModalWindow(popup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;

  escapePopup(popup);
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;

  closeModalWindow(popup);
}

formElement.addEventListener('submit', formSubmitHandler);

const newPopup = document.querySelector('.popup-new');
const newPopupOpenButton = document.querySelector('.profile__add-button');
const newPopupCloseButton = newPopup.querySelector('.popup-new__close-button');


function openNewPopup(event) {
  openModalWindow(newPopup);
  escapePopup(newPopup);
}

const elementsContainer = document.querySelector('.elements');

initialCards.forEach((item) => {
  const card = new Card(item, '.template');
  const cardElement = card.generateCard();

  elementsContainer.append(cardElement);
});

const place = document.querySelector('.popup__form-item_type_place');
const link = document.querySelector('.popup__form-item_type_link');
const placeForm = document.querySelector('.popup-new__container');

const addNewElement = evt => {
  evt.preventDefault();

  const placeValue = place.value;
  const linkValue = link.value;
  const newCard = {
    name: placeValue,
    link: linkValue
  };
  const submitButton = placeForm.querySelector('.popup-new__submit-button')

  const newElement = new Card(newCard, '.template');
  const cardElement = newElement.generateCard();


  function renderNewCard(cardElement) {
    elementsContainer.prepend(cardElement);
  }

  renderNewCard(cardElement);

  closeModalWindow(newPopup);

  placeForm.reset();
  submitButton.setAttribute('disabled', '');
  submitButton.classList.add('popup__submit-button_status_disabled');

}

placeForm.addEventListener('submit', addNewElement);

popupOpenButton.addEventListener('click', openPopup);
newPopupOpenButton.addEventListener('click', openNewPopup);

document.querySelectorAll('.popup__close-button').forEach((button) => {
  button.addEventListener('click', (event) => {
    closeModalWindow(event.target.closest('.popup'));
  })
})

window.onclick = function(event) {
  if (event.target == popup || event.target == newPopup || event.target == imgPopup) {
    closeModalWindow(event.target.closest('.popup'));
  }
}

Array.from(document.forms).forEach(form => {
  const validator = new FormValidator(settings, form);
  validator.enableValidation();
})