import {initialCards, validateParams, cardParams} from './data.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js'

const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupCardAdd = document.querySelector('.popup_type_card-add');
const popupPhotoOpen = document.querySelector('.popup_type_photo-open');
const popupPhotoOpenImage = popupPhotoOpen.querySelector('.popup__image');
const popupPhotoOpenSubtitle = popupPhotoOpen.querySelector('.popup__subtitle');
const formProfileEdit = document.querySelector('.popup__form_type_profile-edit')
const formCardAdd = document.querySelector('.popup__form_type_card-add')
const buttonCloseProfileEdit = document.querySelector('.popup__button-close_type_profile-edit');
const buttonCloseCardAdd = document.querySelector('.popup__button-close_type_card-add');
const buttonClosePhotoOpen = document.querySelector('.popup__button-close_type_photo-open');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');
const popupProfileInputName = popupProfileEdit.querySelector('.popup__input_field_name');
const popupProfileInputAbout = popupProfileEdit.querySelector('.popup__input_field_about');
const popupCardInputName = popupCardAdd.querySelector('.popup__input_field_name');
const popupCardInputLink = popupCardAdd.querySelector('.popup__input_field_about');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const popupOpened = document.querySelector('.popup_opened');


const validateEditProfile = new FormValidator(validateParams, formProfileEdit);
const validateAddCard = new FormValidator(validateParams, formCardAdd);

validateEditProfile.enableValidation();
validateAddCard.enableValidation();

//генератор новой карточки
const createNewCard = (cardData) => {
  const card = new Card(cardData, cardParams, viewPhoto);
  return card.generateCard();

}
//первая загрузка карточек из массива
const renderCardsFromArray = () => {
  initialCards.forEach((item) => {
    elements.append(createNewCard(item));
  });
};

//открываем popup фото
const viewPhoto = (name, link) => {
  popupPhotoOpenImage.src = link;
  popupPhotoOpenImage.alt = name;
  popupPhotoOpenSubtitle.textContent = name;
  openPopup(popupPhotoOpen);
};

//предварительно заполняем поля формы профиля и открываем попап
const openEditProfile = () => {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputAbout.value = profileAbout.textContent;
  validateEditProfile.clearErrorForm();
  validateEditProfile.toggleButtonState();
  openPopup(popupProfileEdit);
};

//открываем попап формы карточки
const openAddCard = () => {
  validateAddCard.clearCardForm();
  validateAddCard.clearErrorForm();
  validateAddCard.toggleButtonState();
  openPopup(popupCardAdd);
};

//при сабмите формы профиля переписываем соотв поля профиля
const handleProfileFormSubmit = (event) => {
  event.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileAbout.textContent = popupProfileInputAbout.value;
  closePopup(popupProfileEdit);
};

//при сабмите формы карточки добавляем карточку в сетку и очищаем инпуты
const handleCardFormSubmit = (event) => {
  event.preventDefault();
  elements.prepend(createNewCard({name: popupCardInputName.value, link: popupCardInputLink.value}));
  closePopup(popupCardAdd);
};

//закрываем попап по оверлею
const closePopupByClickArea = (event) => {
  const popup = event.target;
  if(event.target === event.currentTarget) {
    closePopup(popup);
  }
};

//закрытие попапа клавишей esc
const closePopupByEsc = (event) => {
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
};


renderCardsFromArray();

buttonEditProfile.addEventListener('click', openEditProfile);
buttonAddCard.addEventListener('click', openAddCard);
buttonClosePhotoOpen.addEventListener('click', () => closePopup(popupPhotoOpen));
buttonCloseProfileEdit.addEventListener('click', () => closePopup(popupProfileEdit));
buttonCloseCardAdd.addEventListener('click', () => closePopup(popupCardAdd));
formProfileEdit.addEventListener('submit', (event) => handleProfileFormSubmit(event));
formCardAdd.addEventListener('submit', (event) => handleCardFormSubmit(event));
