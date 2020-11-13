import { openModalWindow, escapePopup } from './main.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _openCard() {
    const imgPopup = document.querySelector('.img-popup');
    const imgPopupPicture = imgPopup.querySelector('.img-popup__pic');
    openModalWindow(imgPopup);
    imgPopupPicture.src = this._link;
    imgPopup.querySelector('.img-popup__text').textContent = this._name;
    imgPopupPicture.alt = this._name;

    escapePopup(imgPopup);
  }

  _deleteCard() {
    this.element.remove();
  }

  _setLike() {
    this.element.querySelector('.element__like-button').classList.toggle('element__like-button_status_active');
  }

  _setEventListeners() {
    this.element.querySelector('.element__like-button').addEventListener('click', () => {
      this._setLike()
    })
    this.element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteCard();
    })
    this.element.querySelector('.element__img').addEventListener('click', () => {
      this._openCard();
    })
  }

  generateCard() {
    this.element = this._getTemplate()

    this.element.querySelector('.element__title').textContent = this._name;
    this.element.querySelector('.element__img').src = this._link;
    this.element.querySelector('.element__img').alt = this._link;

    this._setEventListeners();

    return this.element
  }
}