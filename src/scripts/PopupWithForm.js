import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._settings.formSelector = '.popup__container';
    this._settings.inputSelector = '.popup__form-item';
  }
  
  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll(this._settings.inputSelector);
    const values = {};
    this._inputList.forEach(input => {
      values[input.name] = input.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popupSelector.querySelector(this._settings.formSelector);
    this._form.addEventListener('submit', () => {
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}