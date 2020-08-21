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

let newPopup = document.querySelector('.popup-new');
let newPopupOpenButton = document.querySelector('.profile__add-button'); 
let newPopupCloseButton = newPopup.querySelector('.popup-new__close-button');

let newPopupOpen = function() {
  newPopup.classList.add('popup_opened');
}

let newPopupClose = function() {
  newPopup.classList.remove('popup_opened');
}

newPopupOpenButton.addEventListener('click', newPopupOpen);
newPopupCloseButton.addEventListener('click', newPopupClose);

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementsContainer = document.querySelector('.elements');
const newElement = card => {
  const Element = document.querySelector('#element-template').content.cloneNode(true);

  Element.querySelector('.element__title').textContent = card.name; 
  Element.querySelector('.element__img').src = card.link;

  const likeBtn = Element.querySelector('.element__like-button');

  function iLikeU() {
    likeBtn.classList.toggle('element__like-button_status_active');
  }

  likeBtn.addEventListener('click', iLikeU);

  const imgPopup = document.querySelector('.img-popup');
  const elementImage = Element.querySelector('.element__img');

  function imgPopupOpen() {
    imgPopup.classList.add('popup_opened');
    imgPopup.querySelector('.img-popup__pic').src = card.link;
    imgPopup.querySelector('.img-popup__text').textContent = card.name;
  }

  elementImage.addEventListener('click', imgPopupOpen);

  function imgPopupClose() {
    imgPopup.classList.remove('popup_opened');
  }

  imgPopup.querySelector('.img-popup__close-button').addEventListener('click', imgPopupClose);


  Element.querySelector('.element__delete-button').addEventListener('click', event => {
    const deleted = event.target.closest('.element')

    deleted.remove() 
  
  })

  elementsContainer.prepend(Element);
}
initialCards.forEach(newElement);

const place = document.querySelector('.popup__form-item_type_place'); 
const link = document.querySelector('.popup__form-item_type_link');
const placeForm = document.querySelector('.popup-new__container'); 

const addNewElement = evt => {
  evt.preventDefault();
  
  const placeValue = place.value; 
  const linkValue = link.value;
  const newCard = {name: placeValue, link: linkValue};

  newElement(newCard);
  
  newPopupClose();
}

placeForm.addEventListener('submit', addNewElement);


