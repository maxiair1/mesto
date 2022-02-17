const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupCardAdd = document.querySelector('.popup_type_card-add');
const popupPhotoOpen = document.querySelector('.popup_type_photo-open');
const formProfileEdit = document.querySelector('.popup__form_type_profile-edit')
const formCardAdd = document.querySelector('.popup__form_type_card-add')
const buttonCloseProfileEdit = document.querySelector('.popup__button-close_type_profile-edit');
const buttonCloseCardAdd = document.querySelector('.popup__button-close_type_card-add');
const buttonClosePhotoOpen = document.querySelector('.popup__button-close_type_photo-open');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');
const buttonCardSubmit = document.querySelector('.popup__button-submit_type_card-add');
const buttonProfileSubmit = document.querySelector('.popup__button-submit_type_profile-edit');
const popupProfileInputName = popupProfileEdit.querySelector('.popup__input_field_name');
const popupProfileInputAbout = popupProfileEdit.querySelector('.popup__input_field_about');
const popupCardInputName = popupCardAdd.querySelector('.popup__input_field_name');
const popupCardInputLink = popupCardAdd.querySelector('.popup__input_field_about');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#template-card').content;

//первая загрузка карточек из массива
const renderCardsFromArray = () => {
  initialCards.forEach((item) => elements.append(createCardElement(item)));
};

//здесь мы собираем элемент из темплейта и привязываем соотв обработчики событий
const createCardElement = (element) => {
  const elementClone = elementTemplate.cloneNode(true);
  const cardImage = elementClone.querySelector('.element__image');
  const cardTitle = elementClone.querySelector('.element__title');
  cardTitle.innerText = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  addCardListeners(elementClone, element, cardImage);
  return elementClone;
};

//вешаем обработачики событий на кнопки карточки
const addCardListeners = (elementClone, element, cardImage) => {
  elementClone.querySelector('.element__heart').addEventListener('click', clickToLike);
  elementClone.querySelector('.element__trash').addEventListener('click', removeCard);
  cardImage.addEventListener('click', () => viewPhoto(element.name, element.link));

};

//клик по лайку
const clickToLike = (evt) => {
  evt.target.classList.toggle('element__heart_black_active') ;
};

//открываем popup фото
const viewPhoto = (name, link) => {
  const photo = popupPhotoOpen.querySelector('.popup__image');
    photo.src = link;
    photo.alt = name;
    popupPhotoOpen.querySelector('.popup__subtitle').textContent = name;
    openPopup(popupPhotoOpen);
};

//предварительно заполняем поля формы профиля и открываем попап
const openEditProfile = (event, formElement) => {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputAbout.value = profileAbout.textContent;
  toggleButtonState(validateParams,createInputList(validateParams,formElement),buttonProfileSubmit)
  openPopup(popupProfileEdit);
};

//открываем попап формы карточки
const openAddCard = (event, formElement) => {
  toggleButtonState(validateParams,createInputList(validateParams,formElement),buttonCardSubmit)
  clearCardForm();
  openPopup(popupCardAdd);
};

//очистка полей формы карточки
const clearCardForm = () => {
  popupCardInputName.value = '';
  popupCardInputLink.value = '';
}

//при сабмите формы профиля переписываем соотв поля профиля
const handleProfileFormSubmit = (event, formElement) => {
  event.preventDefault();
  if(checkForm(formElement)) {
    profileName.textContent = popupProfileInputName.value;
    profileAbout.textContent = popupProfileInputAbout.value;
    closePopup(popupProfileEdit);
  }
};

//при сабмите формы карточки добавляем карточку в сетку и очищаем инпуты
const handleCardFormSubmit = (event, formElement) => {
  event.preventDefault();
  if(checkForm(formElement)) {
    elements.prepend(createCardElement({name: popupCardInputName.value, link: popupCardInputLink.value}));
    clearCardForm();
    closePopup(popupCardAdd);
  }
};

//проверка формы на валидацию
const checkForm = (formElement) => {
  if(!hasInvalidInput(createInputList(validateParams, formElement))){
    return true;
  }
  else return false;
}

//удаляем карточку
const removeCard = (event) => {
  event.target.closest('.element').remove();
};

//закрываем попап по оверлею
const closePopupByClickArea = (event, popup) => {
  if(event.target === event.currentTarget) {
    closePopup(popup);
  }
};

//закрытие попапа клавишей esc
const closePopupByEsc = (event, popup) => {
 if(event.key === 'Escape') {
   closePopup(popup);

 }
}

//формируем массив попапов
const createPopupList = () => {
  return Array.from(document.querySelectorAll('.popup'))
};

//
const fn = (event) => {
  if(event.target === event.currentTarget) return true
  else return false
}

//
const fn2 = (popup) => {
  if(fn)     closePopup(popup);

}

//вешаем на оверлеи попапов обработчики
const setPopupListeners = (popup) => {
    popup.addEventListener('mousedown', (event) => closePopupByClickArea(event, popup), {once:true});
    document.addEventListener('keydown', (event) => closePopupByEsc(event, popup),{once:true});
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  setPopupListeners(popup);
};

//закрываем попап, который мы передали вручную
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
};


renderCardsFromArray();
enableValidation(validateParams);

buttonEditProfile.addEventListener('click', (event) => openEditProfile(event, formProfileEdit));
buttonAddCard.addEventListener('click', (event) => openAddCard(event, formCardAdd));
buttonClosePhotoOpen.addEventListener('click', () => closePopup(popupPhotoOpen));
buttonCloseProfileEdit.addEventListener('click', () => closePopup(popupProfileEdit));
buttonCloseCardAdd.addEventListener('click', () => closePopup(popupCardAdd));
formProfileEdit.addEventListener('submit', (event) => handleProfileFormSubmit(event, formProfileEdit));
formCardAdd.addEventListener('submit', (event) => handleCardFormSubmit(event, formCardAdd));

