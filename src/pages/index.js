import './index.css';
import {
  Card
} from '../scripts/Card.js';
import {
  settings,
  FormValidator
} from '../scripts/FormValidator.js';
import { initialCards } from '../scripts/cards.js';
import Popup from '../scripts/Popup.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import { values } from 'core-js/fn/array';

const popupSelector = document.querySelector('.popup-edit'); //!!!!
const editOpenButton = document.querySelector('.profile__edit-button');
//const popupCloseButton = popup.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__container');
const inputElement = formElement.querySelector('.popup__form-item');
const nameInput = formElement.querySelector('.popup__form-item_type_name');
const jobInput = formElement.querySelector('.popup__form-item_type_job');
const profileName = document.querySelector('.profile__name'); //!!
const profileOccupation = document.querySelector('.profile__occupation'); //!!!
const imgPopup = document.querySelector('.img-popup'); //!!!!
const popupList = document.querySelectorAll('.popup');
const popupOpened = document.querySelector('.popup_opened');
const newPopup = document.querySelector('.popup-new'); //!!!!
const newCardOpenButton = document.querySelector('.profile__add-button');
const newCardCloseButton = newPopup.querySelector('.popup-new__close-button');
const elementsContainer = document.querySelector('.elements'); //!!!!!
const place = document.querySelector('.popup__form-item_type_place');
//const link = document.querySelector('.popup__form-item_type_link');
const placeForm = document.querySelector('.popup-new__container');

const addNewElement = (item) => {
  const card = new Card(
    item,
    '.template',
    (name, link) => popupWithImage.open({
      link: link,
      name: name
    }));

  return card.generateCard();
}

const popupWithImage = new PopupWithImage(imgPopup); 
popupWithImage.setEventListeners(); 

const cardsArray = new Section({
  items: initialCards,
  renderer: item => cardsArray.addItem(addNewElement(item))
},
elementsContainer
);

const userInfoSettings = {
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__occupation'
}

const user = new UserInfo(userInfoSettings);

const editPopupSelector = document.querySelector('.popup-edit')
const editPopup = new PopupWithForm(
  editPopupSelector,
  inputValues => {
    user.setUserInfo({
      userName: inputValues.name,
      userInfo: inputValues.about
    })

    editPopup.close();
  }
);
editPopup.setEventListeners();

const addNewCardPopup = new PopupWithForm(
  newPopup,
  inputValues => {
    cardsArray.addItem(addNewElement(inputValues), true);
    addNewCardPopup.close();
  }
);
addNewCardPopup.setEventListeners();

cardsArray.renderItems();

const editForm = document.querySelector('.popup-edit__container');

const editPopupValidator = new FormValidator(settings, editForm);
editPopupValidator.enableValidation();

const addNewCardValidator = new FormValidator(settings, placeForm);
addNewCardValidator.enableValidation();

const addOpenButton = document.querySelector('.profile__add-button')

addOpenButton.addEventListener('click', () => {
  addNewCardPopup.open();
})

editOpenButton.addEventListener('click', () => {
  const currentUserData = user.getUserInfo();
  nameInput.value = currentUserData.userName;
  jobInput.value = currentUserData.userInfo;
  editPopup.open();
})