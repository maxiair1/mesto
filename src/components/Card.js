export class Card {
  constructor(cardData, cardParam, handleCardClick, handleLikeClick, handleCardDelete){
    this._cardData = cardData;
    this._cardParam = cardParam;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCardDelete = handleCardDelete;
    this._likeCounter = cardData.likes.length;
    this._element = document
      .querySelector(this._cardParam.cardTemplate)
      .content
      .querySelector(this._cardParam.cardElement)
      .cloneNode(true);
    this._cardRemove = this._element.querySelector(this._cardParam.cardRemove);
  }

  // //клонируем карточку из шаблона
  // _getTemplate () {
  //   return this._templateElement.cloneNode(true);
  // }

  //сгенерируем карточку
  generate() {
    this._cardImage = this._element.querySelector(this._cardParam.cardImage);
    this._cardTitle = this._element.querySelector(this._cardParam.cardTitle);
    this._cardLike = this._element.querySelector(this._cardParam.cardLike);
    this._cardLikeCount = this._element.querySelector(this._cardParam.cardLikeCount);

    this._cardTitle.textContent = this._cardData.name;
    this._cardLikeCount.textContent = this._likeCounter;
    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;
    this._checkLike();
    this._addListeners();
    this._isCardOwner();
    return this._element;
  }

  //вешаем обработчики событий на кнопки карточки
  _addListeners(){
    this._cardLike.addEventListener('click', () => this._handleLikeClick(this._cardData._id));
    this._cardRemove.addEventListener('click', () => this._handleCardDelete(this._cardData._id));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardData.name, this._cardData.link));
  }

  //клик по лайку
  // _clickToLike() {
  //   this._cardLike.classList.toggle(this._cardParam.cardLikeActive);
  // }


  setLikes(newLike) { //передаем св-во likes (массив объектов из юзеров) из объекта карточки
    this._likeCounter = newLike.length;
    this._cardLikeCount.textContent = this._likeCounter;

    this._cardData.likes = newLike;
    this._checkLike();

  }
  //ищем в массиве лайков наш id
  isLiked() {
    let isTrue = false;
    this._cardData.likes.forEach( item => {
      if(item._id === this._cardData.userId) {
        isTrue = true;
      }
    } )
    return isTrue;
  }

  _checkLike() { //если нашли в лайках наш id закрашиваем иконку
    if(this.isLiked() ) {  // закрашиваем сердечко
      this._cardLike.classList.add(this._cardParam.cardLikeActive);
    } else { // сердечко не закрашено
      this._cardLike.classList.remove(this._cardParam.cardLikeActive);
    }
  }

  //удаляем карточку
  remove() {
    this._element.remove();
    this._element = null;
  }

  //проверяем, что создал карточку владелец профиля
  _isCardOwner(){
    if(this._cardData.owner._id !== this._cardData.userId) {
      this._cardRemove.style.display = 'none';
    }
  }

}
