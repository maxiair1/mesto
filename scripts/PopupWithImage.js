import {Popup} from './Popup.js';

export class PopupWithImage extends Popup{

  open(name, link){ //вставляем в попап картинку с src изображения и подписью к картинке
    const imageName = this._popupContainer.querySelector('.popup__subtitle');
    const imageLink = this._popupContainer.querySelector('.popup__image');

    imageLink.src = link;
    imageName.alt = name;
    imageName.textContent = name;
    super.open();
  }

}
