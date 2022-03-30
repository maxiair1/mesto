export class Popup {
  constructor(popupSelector) {
    this._popupContainer = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this)
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
    const closeButton = this._popupContainer.querySelector('.popup__button-close');
    this._popupContainer.addEventListener('mousedown', (event) =>{
      if(event.target === event.currentTarget || event.target === closeButton) {
        this.close();
      }
    });
  }

}
