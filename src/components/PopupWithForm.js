import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popupContainer.querySelector('.popup__form');
    this._inputList = this._popupContainer.querySelectorAll('.popup__input');
  }

  getInputValues(config){ //собираем данные со всех полей формы и формируем объект с ключами из config
    //config вида {key - соотв ключу в api : value - соотв input-name}
    this._inputValuesObj = {};
    this._formValues = {};

    //собираем объект вида {"input-name" : "input_value"}
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    //собираем объкт вида {"config-key" : "input_value"} где config.value === _formValues.key
    Object.keys(config).forEach( item => {
      this._inputValuesObj[item] = this._formValues[config[item]];
    });

    return this._inputValuesObj;
  }


  getFormName() { //получить имя формы
    return this._form.getAttribute('name');
  }

  setInputValues(data) { //вставляем данные в поля формы
    this._inputList.forEach(input => input.value = data[input.name])
  }

  setEventListeners() { //добавляем обработчик сабмита формы.
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit();
    })
  }

  close() { //закрываем попап и сбрасываем форму
    super.close();
    this._form.reset();
  }

}
