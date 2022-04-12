import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popupContainer.querySelector('.popup__form');
    this._inputList = this._popupContainer.querySelectorAll('.popup__input');
  }

  _getInputValues(){ //собираем данные со всех полей формы
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  getInputProfile(){
    this._formValues = {};
    this._formValues.name = this._inputList[0].value;
    this._formValues.about = this._inputList[1].value;
    return this._formValues;
  }

  getInputCard(){
    this._formValues = {};
    this._formValues.name = this._inputList[0].value;
    this._formValues.link = this._inputList[1].value;
    return this._formValues;
  }

  getInputAvatar(){
    const link = this._inputList[0].value;
    return link;
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
      this._formSubmit(this._getInputValues());
    })
  }

  close() { //закрываем попап и сбрасываем форму
    super.close();
    this._form.reset();
  }




}
