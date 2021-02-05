export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._settings = {
      openSelector: 'popup_opened',
      escape: 'Escape'
    };
  }

  open() {
    this._popupSelector.classList.add(this._settings.openSelector);
    document.addEventListener('keyup', this._handleEscClose.bind(this));
  }

  close() {
    this._popupSelector.classList.remove(this._settings.openSelector);
  }

  _handleEscClose(event) {
    if (event.key === this._settings.escape) {
      this.close();
    };
  };


  setEventListeners() {
    const closeButton = this._popupSelector.querySelector('.popup__close-button');
    closeButton.addEventListener('click', this.close.bind(this));
    this._popupSelector.addEventListener('click', (event) => {
      if (event.target.contains(this._popupSelector)) {
        this.close()
      }
    })
   }
  }