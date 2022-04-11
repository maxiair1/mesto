import {initialCards, validateParams, cardParams, profileParams} from '../utils/data.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js'
import {Section} from "../components/Section.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import {api} from "../components/Api.js";
import './index.css';

const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');
const avatarIcon = document.querySelector(profileParams.profileAvatarIcon);
const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector)) //массив из всех форм в документе
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validateParams);


Promise.all([ api.getProfile(), api.getCards() ])
  .then( ([userData, cardsData]) => {

    /*создаем экз. Section( {
      items - массив obj карточек,
      callback -> item - obj карточки с сервера},
      cardParams.cardContainer - селектор контейнера куда вставлять карточки
      )
    */
    const cardList = new Section({
      items: cardsData,

      //ф-я пробегается по массиву и на каждый item создаем новый екз. Card. Далее добавляем карточку на страницу
      renderer: (item) => {
        const cardElement = createNewCard(item);
        cardList.addItem(cardElement);
      }
      }, cardParams.cardContainer);



    /*
     Генератор новой карточки, возвращает готовую разметку карточки
    cardData - obj карточки. Также добавляем ID юзера
    создаем экз. Card({
      cardData - obj карточки + ID юзера,
      cardParams - obj с настройками,
      callback ( Card -> handleCardClick(card.name, card.link) )
        - передаем ф-ю Card -> вешаем ее на обработчик по клику на картинке и тамже передаем агрументы.
        - обработчик вызывая ф-ю открывет попап просмотра картинки,
      callback ( Card -> handleLikeClick(card.id) )
        - передаем ф-ю Card -> вешаем ее на обработчик по клику на like и тамже передаем агрументы.
        - если карточка не была нами лайкнута ранее, отправляем запрос на добавление и в ответе отображаем на странице
        - если была лайкнута ранее, отправляем запрос на удаление лайка и в ответе отображаем на страницеб
      callback ( Card -> handleCardDelete(card.id) )
        - передаем ф-ю Card -> вешаем ее на обработчик по клику на корзинку и тамже передаем агрументы.
        - обработчик вызывая ф-ю открывает попап запроса на удаление
        - перезаписываем сабмит ф-ю у экз. PopupWithForm:
          1) на кнопке сабмита отображаем надпись "Сохранение...", пока данные грузятся
          2) отправляем запрос на удаление карточки на сервер, передав ID карточки
          3) в ответе удаляем карточку со страницы, возвращаем надпись кнопке и закрываем попап
    */
    const createNewCard = (cardData) => {
      cardData.userId = userData._id;
      const card = new Card(
        cardData,
        cardParams,

        //открывает попап картинки
        () => popupImage.open(cardData.name, cardData.link),

        //like карточке
        (id) => {
          if(!card.isLiked()) {
            api.addLike(id)
              .then(res => {

                //передаем массив likes, обновляем счетчик, обновляем массив в obj карточки и закрашиваем like
                card.setLikes(res.likes)
              })
          } else {
            api.deleteLike(id)
              .then(res => {
                //передаем массив likes, обновляем счетчик, обновляем массив в obj карточки и убираем закрашивание like
                card.setLikes(res.likes)
              })
          }
        },
        (id) => {
          popupDeleteCard.open()
          popupDeleteCard.updateSubmitHandler( () => {
            popupDeleteCard.setButtonText('Сохранение...');
            api.deleteCard(id)
              .then( res => {
                card.remove();
                popupDeleteCard.setButtonText('Да');
                popupDeleteCard.close();
              })
          })
        }
        );
      return card.generate();
    }

    const userInfo = new UserInfo(profileParams);
    // const userAvatar = new UserInfo(profileParams);

//предварительно заполняем поля формы профиля и открываем попап
    const openEditProfile = () => {
      const userDataInfo = userInfo.getUserInfo();
      popupProfile.setInputValues({
        [profileParams.profileNameInput]: userDataInfo.name,
        [profileParams.profileAboutInput]: userDataInfo.about
      });
      formValidators[ popupProfile.getFormName() ].resetValidation();
      popupProfile.open();
    };

    //создаем экземпяр класса юзера, передаем в конструктор объект с настройками и cb ф-ю в которой открываем попап
    const openUpdateAvatar = () => {
      const userAvatarInfo = userInfo.getUserInfo();
      popupAvatar.setInputValues({
        [profileParams.profileAvatarInput]: userAvatarInfo.avatar
      });
        formValidators[popupAvatar.getFormName()].resetValidation();
        popupAvatar.open();

    }

//открываем попап формы карточки
    const openAddCard = () => {
      formValidators[ popupNewCard.getFormName() ].resetValidation()
      popupNewCard.open();
    };

    //отрисовка профиля на странице
    function renderProfileInfo({name, about}) {
      userInfo.setUserInfo(name, about);
    }

    //отрисовка аватара на странице
    function renderUserAvatar(link){
      userInfo.setUserAvatar(link);
    }

    //вызывается при сабмите формы карточки
    //data - obj карточки
    const handleCardFormSubmit = (data) => {
      const newCardData = createNewCard(data)
      cardList.addItem(newCardData);
      popupNewCard.setButtonText('Сохранить');//возвращаем кнопке текст после того как отправили форму

      popupNewCard.close();
    };

    //сабмит формы аватара
    const handleAvatarFormSubmit = (link) => {
      renderUserAvatar(link)
      popupAvatar.setButtonText('Сохранить');//возвращаем кнопке текст после того как отправили форму

      popupAvatar.close();
    };


    //сабмит формы профиля
    const handleProfileFormSubmit = (data) => {
      renderProfileInfo(data);
      popupProfile.setButtonText('Сохранить');//возвращаем кнопке текст после того как отправили форму

      popupProfile.close();
    };

    //создаем экз. классов попап
    const popupImage = new PopupWithImage('.popup_type_photo-open');
    const popupNewCard = new PopupWithForm('.popup_type_card-add', () => {
      popupNewCard.setButtonText('Сохранение...'); //добавляем кнопке текст пока данные грузятся

      api.addCard(popupNewCard.getInputCard())
        .then( res => {
          handleCardFormSubmit(res)

        })
    } );
    const popupAvatar = new PopupWithForm('.popup_type_profile-avatar', () => {
      popupAvatar.setButtonText('Сохранение...'); //добавляем кнопке текст пока данные грузятся

      api.updateAvatar(popupAvatar.getInputAvatar())
        .then( res => {
          handleAvatarFormSubmit(res.avatar)
        })
    } );

    const popupDeleteCard = new PopupWithForm('.popup_type_card-delete', () => {
      api.addCard(popupDeleteCard.getInputCard())
        .then( res => {
          handleCardFormSubmit(res)
        })
    });

    const popupProfile = new PopupWithForm('.popup_type_profile-edit', () => {
      popupProfile.setButtonText('Сохранение...'); //добавляем кнопке текст пока данные грузятся

      api.editProfile(popupProfile.getInputProfile())
        .then((res) => {
          handleProfileFormSubmit(res)
        })
    });

    //рендерим name, about и avatar юзера. userData - obj с сервера, userData.avatar - линк на аватар
    renderProfileInfo(userData);
    renderUserAvatar(userData.avatar);

    //рендерим карточки
    cardList.renderItems();

    popupImage.setEventListeners();
    popupProfile.setEventListeners();
    popupNewCard.setEventListeners();
    popupDeleteCard.setEventListeners();
    popupAvatar.setEventListeners();

    buttonEditProfile.addEventListener('click', openEditProfile);
    buttonAddCard.addEventListener('click', openAddCard);
    avatarIcon.addEventListener('click', openUpdateAvatar);
  })







