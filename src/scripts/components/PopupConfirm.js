import Popup from './Popup.js'; 

export default class PopupConfirm extends Popup {
  constructor(popupSelector, buttonHandler) {
    super(popupSelector);
    this._buttonHandler = buttonHandler;
    this._settings.buttonSelector = '.delete-popup__submit-button';
  }

  setEventListeners() {
    super.setEventListeners();
    this._button = this._popupSelector.querySelector(this._settings.buttonSelector);
    this._button.addEventListener('click', () => {
      this._buttonHandler(this.card);
    });
  }

  open(card) {
    super.open();
    this.card = card;
  }
}