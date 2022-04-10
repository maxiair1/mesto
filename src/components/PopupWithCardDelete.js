import {Popup} from './Popup.js';

export class PopupWithCardDelete extends Popup{
  constructor(popupSelector, handlerCardDelete ) {
    super(popupSelector);
    this._handlerCardDelete = handlerCardDelete;
    console.log('popupDelete: ', this._handlerCardDelete())
  }

  setEventListeners() { //добавляем обработчик сабмита формы.
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('_handlerCardDelete: ', this._handlerCardDelete())
      this._handlerCardDelete();
    })
  }

  setButtonText(text){
    this._closeButton.textContent = text;
  }

  updateSubmitHandler(fn){
    this._handlerCardDelete = fn;
  }
}
