export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(settings.submitButtonSelector);
    this._inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this.inputList)) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', '');
    };
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage, errorElement);
    } else {
      this._hideError(inputElement, errorElement);
    };
  }

  _showError(inputElement, errorMessage, errorElement) {
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideError(inputElement, errorElement) {
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._inputList.forEach((inputElement) => {
      this._formElement.addEventListener('reset', () => {
        this._inputList.forEach((inputElement) => {
          const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
          this._hideError(inputElement, errorElement)
        })
        this._toggleButtonState();
      });
    })
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._toggleButtonState();
    this._setEventListeners();
  };
};