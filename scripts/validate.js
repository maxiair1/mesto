
//отображение ошибки
const showInputError = (objValidate, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objValidate.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objValidate.errorClass);
};

//удаление ошибки
const hideInputError = (objValidate, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objValidate.inputErrorClass);
  errorElement.classList.remove(objValidate.errorClass);
  errorElement.textContent = '';
};

//проверка валидности поля ввода
const checkInputValidity = (objValidate, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(objValidate, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(objValidate, formElement, inputElement);
  }
};

//вешаем обработчики событий на поля ввода
const setEventListeners = (objValidate, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(objValidate.inputSelector));
  const buttonElement = formElement.querySelector(objValidate.submitButtonSelector);
  toggleButtonState(objValidate,inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(objValidate, formElement, inputElement);
      toggleButtonState(objValidate, inputList, buttonElement);
    });
  });
};

//меняем состояние кнопки в зависимости от валидации
const toggleButtonState = (objValidate, inputList, buttonElement) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(objValidate.inactiveButtonClass);
  }
  else{
    buttonElement.classList.remove(objValidate.inactiveButtonClass);
  }
}

//проверка валидности всех полей формы
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    if(input.validity.valid){
      return false;
    }
    else return true;
  })
};

//найдем все формы, отменим действия по умолчанию и назначим обработчики
const enableValidation = (objValidate) => {
  const formList = Array.from(document.querySelectorAll(objValidate.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(objValidate, formElement);
  });
};

