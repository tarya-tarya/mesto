import './index.css';
import {
  Card
} from '../scripts/components/Card.js';
import {
  FormValidator
} from '../scripts/components/FormValidator.js';
import {
  initialCards
} from '../scripts/cards.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { 
  settings 
} from '../scripts/settings.js'

const editOpenButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__form-item_type_name');
const jobInput = formElement.querySelector('.popup__form-item_type_job');
const placeForm = document.querySelector('.popup-new__container');
const editForm = document.querySelector('.popup-edit__container');
const addOpenButton = document.querySelector('.profile__add-button');

const containerSelector = '.elements';
const imgPopupSelector = '.img-popup';
const editPopupSelector = '.popup-edit';
const addPopupSelector = '.popup-new';

const popupWithImage = new PopupWithImage(imgPopupSelector);
popupWithImage.setEventListeners();

const addNewElement = (item) => {
  const card = new Card(
    item,
    '.template',
    (name, link) => popupWithImage.open({ name, link }));

  return card.generateCard();
}

const cardsArray = new Section({
    items: initialCards,
    renderer: item => cardsArray.addItem(addNewElement(item))
  },
  containerSelector
);

const user = new UserInfo('.profile__name', '.profile__occupation');

const editPopup = new PopupWithForm({
  popupSelector: editPopupSelector,
  handleFormSubmit: () => {
    user.setUserInfo(nameInput.value, jobInput.value)

    editPopup.close();
  }
});

editPopup.setEventListeners();

const addNewCardPopup = new PopupWithForm({ 
  popupSelector: addPopupSelector, 
  handleFormSubmit: (item) => { 
    cardsArray.addItem(addNewElement(item));
    addNewCardPopup.close();
  } 
}, 
);

addNewCardPopup.setEventListeners();


cardsArray.renderItems();

const editPopupValidator = new FormValidator(settings, editForm);
editPopupValidator.enableValidation();

const addNewCardValidator = new FormValidator(settings, placeForm);
addNewCardValidator.enableValidation();

addOpenButton.addEventListener('click', () => {
  addNewCardPopup.open();
})

editOpenButton.addEventListener('click', () => {
  const currentUserData = user.getUserInfo();
  nameInput.value = currentUserData.userName;
  jobInput.value = currentUserData.userInfo;
  editPopup.open();
})