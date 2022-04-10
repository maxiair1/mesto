export class Popup {
  constructor(popupSelector) {
    this._popupContainer = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeButton = this._popupContainer.querySelector('.popup__button-close');

  }

  open() { //открытие попапа
    this._popupContainer.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);

  }

  close() { //закрытие попапа
    this._popupContainer.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);

  }

  _handleEscClose(event) { //закрытие попапа Esc
    if(event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() { //добавляем слуштели на иконку закрытия попапа и по оверлею
    this._popupContainer.addEventListener('mousedown', (event) =>{
      if(event.target === event.currentTarget || event.target === this._closeButton) {
        this.close();
      }
    });
  }

}
