export class Card {
  constructor({name, link}, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
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
    this.element.querySelector('.element__img').addEventListener('click', () => this._handleCardClick(this._name, this._link))
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