import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({
    popupSelector,
    handleFormSubmit,
    api
  }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupSelector.querySelectorAll('.popup__form-item');
    this._form = this._popupSelector.querySelector('.popup__container');
    this._api = api;
    this._popupSubmitButton = this._popupSelector.querySelector('.popup__submit-button');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupSubmitButton.textContent = "Сохранение..."
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}