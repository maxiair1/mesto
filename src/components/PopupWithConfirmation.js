import {Popup} from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popupContainer.querySelector('.popup__form');

  }

  updateSubmitHandler(fn){
    this._formSubmit = fn;
  }

  setEventListeners() { //добавляем обработчик сабмита формы.
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit();
    })
  }


}
