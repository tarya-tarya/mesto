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

function openModalWindow(item) {
  item.classList.add('popup_opened');
};

function closeModalWindow(item) {
  item.classList.remove('popup_opened');
};

function escapePopup (item) {
  document.addEventListener('keydown', function(event) {
    if(event.key === 'Escape') {
      item.classList.remove('popup_opened')
    }
  });
  document.removeEventListener('keydown', function(event) {
    if(event.key === 'Escape') {
      item.classList.remove('popup_opened')
    }
  })
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

const newElement = card => {
  const element = document.querySelector('#element-template').content.cloneNode(true);

  const elementImage = element.querySelector('.element__img');

  element.querySelector('.element__title').textContent = card.name; 
  elementImage.src = card.link;
  elementImage.alt = card.name;

  const likeBtn = element.querySelector('.element__like-button');

  function setLike() {
    likeBtn.classList.toggle('element__like-button_status_active');
  }

  likeBtn.addEventListener('click', setLike);

  function openImgPopup(event) {
    openModalWindow(imgPopup);
    imgPopup.querySelector('.img-popup__pic').src = card.link;
    imgPopup.querySelector('.img-popup__text').textContent = card.name;
    imgPopup.querySelector('.img-popup__pic').alt = card.name;

    escapePopup(imgPopup);
  }

  elementImage.addEventListener('click', openImgPopup);

  element.querySelector('.element__delete-button').addEventListener('click', event => {
    const deleted = event.target.closest('.element')
    deleted.remove() 
  })

  return element;
}

function renderCard(newElement) {
  elementsContainer.append(newElement); 
}

initialCards.forEach((card) => { 
  renderCard(newElement(card));
});

const place = document.querySelector('.popup__form-item_type_place'); 
const link = document.querySelector('.popup__form-item_type_link');
const placeForm = document.querySelector('.popup-new__container'); 

const addNewElement = evt => {
  evt.preventDefault();
  
  const placeValue = place.value; 
  const linkValue = link.value;
  const newCard = {name: placeValue, link: linkValue};
  const submitButton = placeForm.querySelector('.popup-new__submit-button')

  function renderNewCard(newElement) {
    elementsContainer.prepend(newElement);
  }

  renderNewCard(newElement(newCard));
  
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