import './index.css';
import {
  Card
} from '../scripts/components/Card.js';
import {
  FormValidator
} from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupConfirm from '../scripts/components/PopupConfirm.js';
import {
  settings
} from '../scripts/settings.js'

const editOpenButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__form-item_type_name');
const jobInput = formElement.querySelector('.popup__form-item_type_job');
const placeForm = document.querySelector('.popup-new__container');
const editForm = document.querySelector('.popup-edit__container');
const avatarForm = document.querySelector('.avatar-edit-popup__container');
const addOpenButton = document.querySelector('.profile__add-button');
const formPopupDelete = document.querySelector('.delete-popup__container');

const containerSelector = '.elements';
const imgPopupSelector = '.img-popup';
const editPopupSelector = '.popup-edit';
const addPopupSelector = '.popup-new';
const deletePopupSelector = '.delete-popup__container';
const avatarPopupSelector = '.avatar-edit-popup__container';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
  headers: {
    'Content-Type': 'application/json',
    'authorization': '661fb21a-2025-42aa-a98f-71e4fb60e18e'
  }
});

const popupWithImage = new PopupWithImage(imgPopupSelector);
popupWithImage.setEventListeners();


//Создание экземпляра карточки
const addNewElement = (item) => {
  const card = new Card(
    item,
    '.template', {
      handleCardClick: (name, link) => popupWithImage.open({
        name,
        link
      }),
      handleDeleteButton: () => popupCardDelete.open(card)
    },
    api
  );

  return card.generateCard(user.getMyId());
}

//Создаём контейнер для карточек
const cardsArray = new Section({
    renderer: item => cardsArray.addItem(addNewElement(item))
  },
  containerSelector,
  api
);

api.getInitialCards()
  .then((data) => {
    cardsArray.renderItems(data);
  })
  .catch((err) => {
    console.log(err)
  })

const addNewCardPopup = new PopupWithForm({
  popupSelector: addPopupSelector,
  handleFormSubmit: (inputValues) => {
    api.addCard({
        name: inputValues.name,
        link: inputValues.link
      })
      .then((res) => {
        cardsArray.addItem(addNewElement({
            ...inputValues,
            owner: {
              _id: user.getMyId()
            },
            _id: res._id
          }),
          true);
      }).catch(err => {
        console.log(err);
      });

    addNewCardPopup.renderLoading(true);
    addNewCardPopup.close();
  },
}, );

addNewCardPopup.setEventListeners();

const popupCardDelete = new PopupConfirm('.delete-popup', (card) => {
  api.deleteCard(card.getCardId())
    .then(() => {
      card.element.remove();
      card.element = null;
    }).catch(err => console.log(err));

  popupCardDelete.close();
});

popupCardDelete.setEventListeners();

const user = new UserInfo('.profile__name', '.profile__occupation', '.profile__avatar');

api.getMyInfo()
  .then((info) => {
    user.setUserInfo({
      userName: info.name,
      userInfo: info.about,
      userId: info._id
    })
    user.setUserAvatar(info.avatar);
  })
  .catch((err) => {
    console.log(err)
  })

const editPopup = new PopupWithForm({
  popupSelector: editPopupSelector,
  handleFormSubmit: (inputValues) => {
    console.log(inputValues)
    api.editProfile(inputValues.username, inputValues.userinfo)
      .then(() => {
        user.setUserInfo({
          userName: inputValues.username,
          userInfo: inputValues.userinfo
        });
        editPopup.renderLoading(true);
        editPopup.close();
      })
      .catch(err => {
        console.log(err);
      });
  }
});

editPopup.setEventListeners();

editOpenButton.addEventListener('click', () => {
  const currentUserData = user.getUserInfo();
  nameInput.value = currentUserData.userName;
  jobInput.value = currentUserData.userInfo;
  editPopup.open();
})

const popupUpdateAvatar = new PopupWithForm({
    popupSelector: '.avatar-edit-popup',
    handleFormSubmit: ({
      link
    }) => {
      api.updateAvatar(link)
        .then(() => {
          user.setUserAvatar(link);
          popupUpdateAvatar.renderLoading(true);
          popupUpdateAvatar.close();
        })
        .catch(err => {
          console.log(err);
        });
    },
    api: api
  }

);

popupUpdateAvatar.setEventListeners();

const profileCover = document.querySelector('.profile__cover');

profileCover.addEventListener('click', () => {
  popupUpdateAvatar.open();
});

const editPopupValidator = new FormValidator(settings, editForm);
editPopupValidator.enableValidation();

const addNewCardValidator = new FormValidator(settings, placeForm);
addNewCardValidator.enableValidation();

const UpdateAvatarValidator = new FormValidator(settings, avatarForm);
UpdateAvatarValidator.enableValidation();

const deleteValidator = new FormValidator(settings, formPopupDelete);
deleteValidator.enableValidation();

addOpenButton.addEventListener('click', () => {
  addNewCardPopup.open();
});