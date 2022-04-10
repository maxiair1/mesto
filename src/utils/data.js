
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validateParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
}

const cardParams = {
  cardTemplate: '#template-card',
  cardImage: '.element__image',
  cardTitle: '.element__title',
  cardLike: '.element__heart',
  cardRemove: '.element__trash',
  cardElement:'.element',
  cardContainer:'.elements',
  cardLikeActive: 'element__heart_black_active',
  cardLikeCount: '.element__heart-count',
  cardNameInput: 'addCard-name',
  cardLinkInput: 'addCard-link',
  cardFormName: 'addCard-form',
  cardFormDelete: 'deleteCard-form',
  cardPopupDelete: '.popup_type_card-delete',
}

const profileParams = {
  profileName: '.profile__title',
  profileAbout: '.profile__subtitle',
  profileNameInput: 'profile-name',
  profileAboutInput: 'profile-about',
  profileFormName: 'profile-form',
  profileFormAvatar: 'profileAvatar-form',
  profilePopupAvatar: '.popup_type_profile-avatar',
  profileAvatar: '.profile__avatar-image',
}

export {initialCards, validateParams, cardParams, profileParams};
