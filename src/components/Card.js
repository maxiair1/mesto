export class Card {
  constructor(cardData, cardParam, handleCardClick){
    this._cardData = cardData;
    this._cardParam = cardParam;
    this._handleCardClick = handleCardClick;

    this._templateElement = document
      .querySelector(this._cardParam.cardTemplate)
      .content
      .querySelector(this._cardParam.cardElement);
  }

  //клонируем карточку из шаблона
  _getTemplate () {
    return this._templateElement.cloneNode(true);
  }

  //сгенерируем карточку
  generate() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._cardParam.cardImage);
    this._cardTitle = this._element.querySelector(this._cardParam.cardTitle);
    this._cardLike = this._element.querySelector(this._cardParam.cardLike);

    this._cardTitle.textContent = this._cardData.name;
    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;
    this._addListeners();

    return this._element;
  }

  //вешаем обработчики событий на кнопки карточки
  _addListeners(){
    this._cardLike.addEventListener('click', () => this._clickToLike());
    this._element.querySelector(this._cardParam.cardRemove).addEventListener('click', () => this._remove());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardData.name, this._cardData.link));
  }

  //клик по лайку
  _clickToLike() {
    this._cardLike.classList.toggle(this._cardParam.cardLikeActive);
  }

  //удаляем карточку
  _remove() {
    this._element.remove();
    this._element = null;
  }

}
