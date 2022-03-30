import {Popup} from './Popup.js';

export class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._imageName = this._popupContainer.querySelector('.popup__subtitle');
    this._imageLink = this._popupContainer.querySelector('.popup__image');
  }
  open(name, link){ //вставляем в попап картинку с src изображения и подписью к картинке
    this._imageLink.src = link;
    this._imageName.alt = name;
    this._imageName.textContent = name;
    super.open();
  }

}
