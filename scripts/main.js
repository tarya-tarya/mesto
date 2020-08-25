const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__form-item_type_name');
const jobInput = formElement.querySelector('.popup__form-item_type_job');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

function togglePopup(item) {
  item.classList.toggle('popup_opened')
}

function openPopup(event) {
  togglePopup(popup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;

  togglePopup(popup);
}

formElement.addEventListener('submit', formSubmitHandler);

const newPopup = document.querySelector('.popup-new');
const newPopupOpenButton = document.querySelector('.profile__add-button'); 
const newPopupCloseButton = newPopup.querySelector('.popup-new__close-button');

function openNewPopup(event) {
  togglePopup(newPopup);
}

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

  const elementImage = Element.querySelector('.element__img');

  Element.querySelector('.element__title').textContent = card.name; 
  elementImage.src = card.link;
  elementImage.alt = card.name;

  const likeBtn = Element.querySelector('.element__like-button');

  function iLikeU() {
    likeBtn.classList.toggle('element__like-button_status_active');
  }

  likeBtn.addEventListener('click', iLikeU);

  const imgPopup = document.querySelector('.img-popup');

  function imgPopupOpen(event) {
    togglePopup(imgPopup);
    imgPopup.querySelector('.img-popup__pic').src = card.link;
    imgPopup.querySelector('.img-popup__text').textContent = card.name;
  }

  elementImage.addEventListener('click', imgPopupOpen);

  Element.querySelector('.element__delete-button').addEventListener('click', event => {
    const deleted = event.target.closest('.element')

    deleted.remove() 
  
  })

  return Element;
}

initialCards.forEach((card) => {
  elementsContainer.append(newElement(card));
});


const place = document.querySelector('.popup__form-item_type_place'); 
const link = document.querySelector('.popup__form-item_type_link');
const placeForm = document.querySelector('.popup-new__container'); 

const addNewElement = evt => {
  evt.preventDefault();
  
  const placeValue = place.value; 
  const linkValue = link.value;
  const newCard = {name: placeValue, link: linkValue};

  elementsContainer.prepend(newElement(newCard));
  
  togglePopup(newPopup);
}

placeForm.addEventListener('submit', addNewElement);

popupOpenButton.addEventListener('click', openPopup);
newPopupOpenButton.addEventListener('click', openNewPopup);

document.querySelectorAll('.popup__close-button').forEach((button) => {
  button.addEventListener('click', (event) => {
    togglePopup(event.target.closest('.popup'));
  })
})
