const popupForm = document.querySelector('.popup_overlay_form');
const popupImage = document.querySelector('.popup_overlay_image');
const popupCurrentForm = document.querySelector('.popup__form')
const buttonClosePopup = document.querySelector('.popup__button-close');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');
const formTitle = document.querySelector('.popup__title');
const inputName = document.querySelector('.popup__input_field_name');
const inputAbout = document.querySelector('.popup__input_field_about');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#template-card').content;

const formEditProfile = {
  title: 'Редактировать профиль'
};

const formAddCard = {
  title: 'Новое место',
  nameInput: 'Название',
  linkInput: 'Ссылка на картинку'
};

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
//первая загрузка карточек из массива
const renderCardsFromArray = () => {
  initialCards.forEach(createCardElements);
};

//здесь мы собираем элемент из темплейта и привязываем соотв обработчики событий
const createCardElements = (element) => {
  const elementClone = elementTemplate.cloneNode(true);
  elementClone.querySelector('.element__title').innerText = element.name;
  elementClone.querySelector('.element__image').src = element.link;
  elementClone.querySelector('.element__image').alt = element.name;
  addListeners(elementClone);
  elements.prepend(elementClone);
}

//вешаем обработачики событий на кнопки карточки
const addListeners = (el) => {
  el.querySelector('.element__heart').addEventListener('click', clickToLike);
  el.querySelector('.element__trash').addEventListener('click', removeCard);
  el.querySelector('.element').addEventListener('click', viewPhoto);

};

//клик по лайку
const clickToLike = (evt) => {

  evt.target.closest('.element')
    .querySelector('.element__heart').classList.toggle('element__heart_black_active') ;
};

//открываем фото если не нажали на корзину или сердечко
const viewPhoto = (evt) => {
  const targetTrash = evt.target.classList.contains('element__trash');
  const currentTargetTrash = evt.currentTarget.querySelector('.element__trash').classList.contains('element__trash');
  const targetHeart = evt.target.classList.contains('element__heart');
  const currentTargetHeart = evt.currentTarget.querySelector('.element__heart').classList.contains('element__heart');

  if(!(targetTrash === currentTargetTrash) && !(targetHeart === currentTargetHeart)) {
    const img = evt.target.closest('.element').querySelector('.element__image').src;
    const title = evt.target.closest('.element').querySelector('.element__title').textContent;
    popupImage.querySelector('.popup__image').src = img;
    popupImage.querySelector('.popup__image').alt = title;
    popupImage.querySelector('.popup__subtitle').textContent = title;
    popupImage.querySelector('.popup__button-close').addEventListener('click', closeAllPopup);
    openPopup(popupImage);
  }
};

//предварительно заполняем поля формы профиля и открываем попап
const openEditProfile = () => {
  formTitle.innerText = formEditProfile.title;
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(popupForm);
};

//предварительно заполняем поля формы карточки и открываем попап
const openAddCard = () => {
  formTitle.innerText = formAddCard.title;
  inputName.value = "";
  inputAbout.value = "";
  inputName.placeholder = formAddCard.nameInput;
  inputAbout.placeholder = formAddCard.linkInput;
  openPopup(popupForm);
};

//при сабмите формы определяем кому относится и передаем соотв колбэк
const submitForm = (evt) => {
  evt.preventDefault();
  if(evt.currentTarget.querySelector('.popup__title').textContent === formEditProfile.title)
    editProfile();
  else if(evt.currentTarget.querySelector('.popup__title').textContent === formAddCard.title)
    addCard(popupCurrentForm);
  closePopup(popupForm);
};

const editProfile = () => {
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupForm);
};

//достаем из формы данные инпутов и передаем на формирование карточки (конструкция взята из doka.guide)
const addCard = (form) => {
  const { elements } = form;
  const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element
      return { name, value };
    });
  createCardElements({name:data[0].value, link: data[1].value});
};

//удаляем карточку
const removeCard = (evt) => {
  evt.target.closest('.element').remove();
};

const openPopup = (pop) => {
  pop.classList.add('popup_opened');
};

//удаляем попап, который мы передали вручную
const closePopup = (pop) => {
    pop.classList.remove('popup_opened');
};

//удаляем попап, если мы достаем его из event и удаляем
const closeAllPopup = (pop) => {
  pop.target.closest('.popup').classList.remove('popup_opened');
}

renderCardsFromArray();
buttonEditProfile.addEventListener('click', openEditProfile);
buttonAddCard.addEventListener('click', openAddCard);
buttonClosePopup.addEventListener('click', closeAllPopup);
popupCurrentForm.addEventListener('submit', submitForm);

