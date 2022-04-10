import {initialCards, validateParams, cardParams, profileParams} from '../utils/data.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js'
import {Section} from "../components/Section.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithCardDelete} from "../components/PopupWithCardDelete";
import {UserInfo} from "../components/UserInfo.js";
import './index.css';
import {api} from "../components/Api.js";

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


Promise.all([ api.getProfile(), api.getCards() ])
  .then( ([userData, cardsData]) => {

    const userInfo = new UserInfo(profileParams);

    console.log('promiseAll: ', userData, cardsData)
    renderProfileInfo(userData);
    // console.log('userId: ', userData.name);

    const cardList = new Section({
      items: cardsData,
      renderer: (item) => {
        // item.userId = userData._id;
        const cardElement = createNewCard(item);
        cardList.addItem(cardElement);
      }
      }, cardParams.cardContainer);


    //сабмит формы карточки
    const handleCardFormSubmit = (data) => {
      const newCardData = createNewCard(data)
      cardList.addItem(newCardData);
      popupNewCard.close();
    };

    //экземпляр класса новой карточки
    const createNewCard = (cardData) => {
      cardData.userId = userData._id;
      const card = new Card(
        cardData,
        cardParams,
        () => popupImage.open(cardData.name, cardData.link),
        (id) => {
          if(!card.isLiked()) {
            console.log('isLiked1: ', cardsData)
            api.addLike(id)
              .then(res => {
                console.log('resLike: ', res)
                card.setLikes(res.likes)
              })
          } else {
            console.log('isLiked2: ', card.isLiked())

            api.deleteLike(id)
              .then(res => card.setLikes(res.likes))
          }
        },
        (id) => {
          popupDeleteCard.open()
          popupDeleteCard.updateSubmitHandler( () => {
            popupDeleteCard.setButtonText('Loading');
            console.log('cardId: ', id)
            api.deleteCard(id)
              .then( res => {
                card.remove();
                popupDeleteCard.setButtonText('Yes');
                popupDeleteCard.close();
              })
          })
        }
        );
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

    function renderProfileInfo({name, about}) {
      // console.log('userData: ', name, about)
      // userInfo.setUserInfo(data[profileParams.profileNameInput], data[profileParams.profileAboutInput]);
      userInfo.setUserInfo(name, about);
    }

//сабмит формы профиля
    const handleProfileFormSubmit = (data) => {
      renderProfileInfo(data)
      popupProfile.close();

    };

    const popupImage = new PopupWithImage('.popup_type_photo-open');
    const popupNewCard = new PopupWithForm('.popup_type_card-add', () => {
      api.addCard(popupNewCard.getInputCard())
        .then( res => {
          console.log('addCard: ', res);
          handleCardFormSubmit(res)
        })
    } );

    const popupDeleteCard = new PopupWithForm('.popup_type_card-delete', () => {
      api.addCard(popupDeleteCard.getInputCard())
        .then( res => {
          console.log('addCard: ', res);
          handleCardFormSubmit(res)
        })
    });

    const popupProfile = new PopupWithForm('.popup_type_profile-edit', () => {
      api.editProfile(popupProfile.getInputProfile())
        .then((res) => {
          handleProfileFormSubmit(res)
        })
    });

    cardList.renderItems();

    popupImage.setEventListeners();
    popupProfile.setEventListeners();
    popupNewCard.setEventListeners();
    popupDeleteCard.setEventListeners();

    buttonEditProfile.addEventListener('click', openEditProfile);
    buttonAddCard.addEventListener('click', openAddCard);
  })







