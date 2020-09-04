const formElements = {
  formElement: '.popup__container',
  inputElement: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_status_disabled',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__error-text_status_visible'
}; 

function showError(formElement, inputElement, elementList) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.add(elementList.inputErrorClass);
  errorElement.classList.add(elementList.errorClass);
  errorElement.textContent = inputElement.validationMessage; 
}; 

function hideError(formElement, inputElement, elementList) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.remove(elementList.inputErrorClass);
  errorElement.classList.remove(elementList.errorClass);
  errorElement.textContent = '';
}; 

function checkInputValidity(formElement, inputElement, elementList) {
  if(!inputElement.validity.valid) {
    showError(formElement, inputElement, elementList);
  } else {
    hideError(formElement, inputElement, elementList);
  };
};

function setEventListeners(formElement, elementList) {
  const inputList = Array.from(formElement.querySelectorAll(elementList.inputElement));
  const submitBtn = formElement.querySelector(elementList.submitButtonSelector);
  toggleButtonState(inputList, submitBtn, elementList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, elementList);
      toggleButtonState(inputList, submitBtn, elementList);
    });
  });
};

function enableValidation(elementList) {
  const formList = Array.from(document.querySelectorAll(elementList.formElement));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, elementList);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, submitButtonSelector, elementList) {
  if(hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(elementList.inactiveButtonClass);
    submitButtonSelector.setAttribute('disabled', '');
  } else {
    submitButtonSelector.classList.remove(elementList.inactiveButtonClass);
    submitButtonSelector.removeAttribute('disabled', '');
  };
};

enableValidation(formElements);