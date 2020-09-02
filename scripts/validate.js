  function showError (formElement, inputElement) {
    const submitBtn = formElement.querySelector('.popup__submit-button');
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    submitBtn.setAttribute('disabled', "");
    submitBtn.classList.add('popup__submit-button_status_disabled');
    errorElement.classList.add('popup__error-text_status_visible');
  }

  function hideError (formElement, inputElement) {
    const submitBtn = formElement.querySelector('.popup__submit-button');
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    submitBtn.removeAttribute('disabled', "");
    submitBtn.classList.remove('popup__submit-button_status_disabled');
    errorElement.classList.remove('popup__error-text_status_visible');
  }
  
  const checkInputValidity = (formElement, inputElement, ...rest) => {
    if (!inputElement.validity.valid) {
      showError(formElement, inputElement);
    } else {
      hideError(formElement, inputElement);
    }
  };
  
  const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => { 
    const inputList = Array.from(document.querySelectorAll('.popup__form-item'));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
        checkInputValidity(formElement, inputElement);
      });
    });
};

const enableValidation = ({formSelector, ...rest}) => {
  const getFormList = Array.from(document.querySelectorAll(formSelector));

  getFormList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_status_disabled',
  inputErrorClass: 'popup__error-text',
  errorClass: 'popup__error-text_status_visible',
});