import {initialCards, validateParams, cardParams, profileParams} from './data.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js'
import {Section} from "./Section.js";
import {PopupWithForm} from "./PopupWithForm.js";
import {PopupWithImage} from "./PopupWithImage.js";
import {UserInfo} from "./UserInfo.js";
import '../pages/index.css';

const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const formProfileEdit = document.querySelector('.popup__form_type_profile-edit')
const formCardAdd = document.querySelector('.popup__form_type_card-add')
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');
const popupProfileInputName = popupProfileEdit.querySelector('.popup__input_field_name');
const popupProfileInputAbout = popupProfileEdit.querySelector('.popup__input_field_about');


const validateEditProfile = new FormValidator(validateParams, formProfileEdit);
const validateAddCard = new FormValidator(validateParams, formCardAdd);

validateEditProfile.enableValidation();
validateAddCard.enableValidation();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardParams, () => popupImage.open(item.name, item.link));
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardParams.cardContainer);

//экземпляр класса новой карточки
const createNewCard = (cardData) => {
  const card = new Card(cardData, cardParams, () => popupImage.open(cardData.name, cardData.link));
  return card.generateCard();
}

//предварительно заполняем поля формы профиля и открываем попап
const openEditProfile = () => {
  const {name, about} = userInfo.getUserInfo();
  popupProfileInputName.value = name;
  popupProfileInputAbout.value = about;
  validateEditProfile.clearErrorForm();
  validateEditProfile.toggleButtonState();
  popupProfile.open();
};

//открываем попап формы карточки
const openAddCard = () => {
  validateAddCard.clearCardForm();
  validateAddCard.clearErrorForm();
  validateAddCard.toggleButtonState();
  popupNewCard.open();
};

//сабмит формы профиля
const handleProfileFormSubmit = (data) => {
  userInfo.setUserInfo(data['profile-name'], data['profile-about']);
  popupProfile.close();

};

//сабмит формы карточки
const handleCardFormSubmit = (data) => {
  const newCardData = createNewCard({name: data['addCard-name'], link: data['addCard-link']})
  cardList.addItem(newCardData);
  popupNewCard.close();
};

const popupImage = new PopupWithImage('.popup_type_photo-open');
const popupNewCard = new PopupWithForm('.popup_type_card-add', handleCardFormSubmit );
const popupProfile = new PopupWithForm('.popup_type_profile-edit', handleProfileFormSubmit);
const userInfo = new UserInfo(profileParams)

popupImage.setEventListeners();
popupNewCard.setEventListeners();
popupProfile.setEventListeners();

cardList.renderItems();

buttonEditProfile.addEventListener('click', openEditProfile);
buttonAddCard.addEventListener('click', openAddCard);


