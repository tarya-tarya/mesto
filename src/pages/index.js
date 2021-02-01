import './index.css';
import {
  Card
} from '../scripts/Card.js';
import {
  settings,
  FormValidator
} from '../scripts/FormValidator.js';
import {
  initialCards
} from '../scripts/cards.js';
import Popup from '../scripts/Popup.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import {
  values
} from 'core-js/fn/array';

const editOpenButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__form-item_type_name');
const jobInput = formElement.querySelector('.popup__form-item_type_job');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const placeForm = document.querySelector('.popup-new__container');
const editForm = document.querySelector('.popup-edit__container');
const addOpenButton = document.querySelector('.profile__add-button');

const containerSelector = '.elements';
const imgPopupSelector = '.img-popup';
const editPopupSelector = '.popup-edit';
const addPopupSelector = '.popup-new';

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

const cardsArray = new Section({
    items: initialCards,
    renderer: item => cardsArray.addItem(addNewElement(item))
  },
  containerSelector
);

const popupWithImage = new PopupWithImage(imgPopupSelector);
popupWithImage.setEventListeners();

const user = new UserInfo(profileName, profileOccupation);

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
    const newCard = new Card( 
      item, 
      '.template', 
      (name, link) => { 
        const imagePopup = new PopupWithImage(imgPopupSelector) 
        imagePopup.open({
          link: link,
          name: name
        })
        imagePopup.setEventListeners() 
      } 
    ) 
    const newCardElement = newCard.generateCard(); 
    cardsArray.addItem(newCardElement)
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