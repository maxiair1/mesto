import {initialCards, validateParams, cardParams} from './data.js';
import {enableValidation, toggleButtonState, createInputList, clearErrorForm} from './validate.js';
import {Card} from './card.js';

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
  //initialCards.forEach((item) => elements.append(createCardElement(item)));
  initialCards.forEach((item) => {
    const card = new Card(item, cardParams, viewPhoto);
    const cardElement = card.generateCard()
    // elements.append(createCardElement(item))
    elements.append(cardElement);
  });

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
  toggleButtonState(validateParams,createInputList(validateParams,formElement),buttonProfileSubmit);
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
  formCardAdd.reset();
}

//при сабмите формы профиля переписываем соотв поля профиля
const handleProfileFormSubmit = (event, formElement) => {
  event.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileAbout.textContent = popupProfileInputAbout.value;
  closePopup(popupProfileEdit);
};

//при сабмите формы карточки добавляем карточку в сетку и очищаем инпуты
const handleCardFormSubmit = (event, formElement) => {
  event.preventDefault();
  const card = new Card({name: popupCardInputName.value, link: popupCardInputLink.value}, cardParams, viewPhoto);
  elements.prepend(card.generateCard());
  clearCardForm();
  closePopup(popupCardAdd);
};


//


//закрываем попап по оверлею
const closePopupByClickArea = (event) => {
  const popup = event.target;
  if(event.target === event.currentTarget) {
    closePopup(popup);
  }
};

//закрытие попапа клавишей esc
const closePopupByEsc = (event) => {
  const popupOpened = document.querySelector('.popup_opened');
  if(event.key === 'Escape') {
    closePopup(popupOpened);
  }
}

//открываем попап
const openPopup = (popup) => {
  popup.addEventListener('mousedown', closePopupByClickArea);
  document.addEventListener('keydown', closePopupByEsc);
  popup.classList.add('popup_opened');
};

//закрываем попап
const closePopup = (popup) => {
  popup.removeEventListener('mousedown', closePopupByClickArea);
  document.removeEventListener('keydown', closePopupByEsc);
  popup.classList.remove('popup_opened');
  if(!popup.classList.contains('popup_type_photo-open'))
    clearErrorForm(validateParams, popup.querySelector(validateParams.formSelector));
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

