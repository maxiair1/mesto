import {initialCards, validateParams, cardParams, profileParams} from '../utils/data.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js'
import {Section} from "../components/Section.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import './index.css';

// const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const formProfileEdit = document.querySelector('.popup__form_type_profile-edit')
const formCardAdd = document.querySelector('.popup__form_type_card-add')
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');
// const popupProfileInputName = popupProfileEdit.querySelector('.popup__input_field_name');
// const popupProfileInputAbout = popupProfileEdit.querySelector('.popup__input_field_about');
const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validateParams);

// const validateEditProfile = new FormValidator(validateParams, formProfileEdit);
// const validateAddCard = new FormValidator(validateParams, formCardAdd);
//
// validateEditProfile.enableValidation();
// validateAddCard.enableValidation();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createNewCard(item);
    cardList.addItem(cardElement);
  }
}, cardParams.cardContainer);

//экземпляр класса новой карточки
const createNewCard = (cardData) => {
  const card = new Card(cardData, cardParams, () => popupImage.open(cardData.name, cardData.link));
  return card.generate();
}

//предварительно заполняем поля формы профиля и открываем попап
const openEditProfile = () => {
  const userData = userInfo.getUserInfo();
  popupProfile.setInputValues({
    [profileParams.profileNameInput]: userData.name,
    [profileParams.profileAboutInput]: userData.about
  });
  formValidators[ popupProfile.getFormName() ].resetValidation();
  // validateEditProfile.resetValidation();
  popupProfile.open();
};

//открываем попап формы карточки
const openAddCard = () => {
  formValidators[ popupNewCard.getFormName() ].resetValidation()
  // validateAddCard.resetValidation();
  popupNewCard.open();
};

//сабмит формы профиля
const handleProfileFormSubmit = (data) => {
  userInfo.setUserInfo(data[profileParams.profileNameInput], data[profileParams.profileAboutInput]);
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


