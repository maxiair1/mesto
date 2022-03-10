
class Card {
  constructor(cardData, cardParam, viewPhoto){
    this._cardData = cardData;
    this._cardParam = cardParam;
    this._viewPhoto = viewPhoto;
  }

  //клонируем карточку из шаблона
  _getTemplate () {
    return document
      .querySelector(this._cardParam.cardTemplate)
      .content
      .querySelector(this._cardParam.cardElement)
      .cloneNode(true);
  }



  //сгенерируем карточку
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._cardParam.cardImage);
    this._cardTitle = this._element.querySelector(this._cardParam.cardTitle);
    this._cardLike = this._element.querySelector(this._cardParam.cardLike);

    this._cardTitle.textContent = this._cardData.name;
    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;
    this._addCardListeners();

    return this._element;
  }

  //вешаем обработчики событий на кнопки карточки
  _addCardListeners(){
    this._cardLike.addEventListener('click', () => this._clickToLike());
    this._element.querySelector(this._cardParam.cardRemove).addEventListener('click', () => this._removeCard());
    this._cardImage.addEventListener('click', () => this._viewPhoto(this._cardData.name, this._cardData.link));
  }

  //клик по лайку
  _clickToLike () {
    this._cardLike.classList.toggle(this._cardParam.cardLikeActive);
  }

  //удаляем карточку
  _removeCard () {
    this._element.remove();
  }

}

export {Card};
