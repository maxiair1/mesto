
class FormValidator {
  constructor(validateParams, validateForm) {
    this._validateParams = validateParams;
    this._validateForm = validateForm;
    this._inputList = this._createInputList();
    this._buttonElement = this._validateForm.querySelector(this._validateParams.submitButtonSelector);

  }

  //отменим действия по умолчаниюдля формы и назначим обработчики
  enableValidation() {
    this._validateForm.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  //вешаем обработчики событий на поля ввода
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };

  //формируем массив инпутов формы
  _createInputList() {
    return Array.from(this._validateForm.querySelectorAll(this._validateParams.inputSelector));
  };


  //меняем состояние кнопки в зависимости от валидации
  toggleButtonState() {
    if(this._hasInvalidInput()){
      this._buttonElement.classList.add(this._validateParams.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled',true);
    }
    else{
      this._buttonElement.classList.remove(this._validateParams.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  //проверка валидности всех полей формы
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  };


  //проверка валидности поля ввода
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //отображение ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._validateForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validateParams.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validateParams.errorClass);
  };

//удаление ошибки
  _hideInputError(inputElement) {
    const errorElement = this._validateForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validateParams.inputErrorClass);
    errorElement.classList.remove(this._validateParams.errorClass);
    errorElement.textContent = '';
  };

  //очистка полей формы карточки
  clearCardForm() {
    this._validateForm.reset();
  }

  //очищаем ошибки с формы
  clearErrorForm() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  };
}

export {FormValidator};
