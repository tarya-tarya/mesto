export class Card {
  constructor({
    name,
    link,
    likes = [],
    _id,
    owner
  }, templateSelector, {
    handleCardClick,
    handleDeleteButton
  }, api) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._owner = owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._api = api;
    this._activeLikeClass = 'element__like-button_status_active';
    this._cardOwnerId = this._owner.id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteCard() {
    this._handleDeleteButton();
  }

  _toggleLike() {
    this.element.querySelector('.element__like-button').classList.toggle('element__like-button_status_active');
  }

  _setLikeCounter(quantity) {
    this.element.querySelector('.element__counter').textContent = quantity;
  }

  _handleLike() {
    if (!this.element.querySelector('.element__like-button').classList.contains(this._activeLikeClass)) {
      this._api.putLike(this._id)
        .then(res => {
          this._toggleLike();
          this._setLikeCounter(res.likes.length)
        })
        .catch(err => console.log(err));
    } else
      this._api.deleteLike(this._id)
      .then(res => {
        this._toggleLike();
        this._setLikeCounter(res.likes.length)
      })
      .catch(err => console.log(err));
  }

  _setEventListeners() {
    this.element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLike()
    })
    this.element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteCard();
    })
    this.element.querySelector('.element__img').addEventListener('click', () => this._handleCardClick(this._name, this._link))
  }

  _addData(myId) {
    const likeButton = this.element.querySelector('.element__like-button');
    const cardImage = this.element.querySelector('.element__img');
    const likeCounter = this.element.querySelector('.element__counter');

    if (this._likes.some(item => item._id === myId)) this._toggleLike();

    this.element.querySelector('.element__title').textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._link;
    this._setLikeCounter(this._likes.length)
  }

  getCardId() {
    return this._id;
  }

  generateCard(myId) {
    this.element = this._getTemplate()
    this._addData(myId)

    this._deleteButton = this.element.querySelector('.element__delete-button');
    if (myId !== this._owner._id) {
      this._deleteButton.classList.add('element__delete-button_status_disabled');
      this._setEventListeners(false);
    } else {
      this._deleteButton.classList.remove('element__delete-button_status_disabled');
      this._setEventListeners();
    }

    return this.element
  }
}