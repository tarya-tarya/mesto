import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({
    popupSelector,
    handleFormSubmit
  }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__form-item');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    
    return this._formValues;
  }

  setEventListeners() {
    this._form = this._popupSelector.querySelector('.popup__container');
    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}