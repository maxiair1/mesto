const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form')
const buttonClosePopup = document.querySelector('.popup__button-close');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const inputName = document.querySelector('.popup__input_field_name');
const inputAbout = document.querySelector('.popup__input_field_about');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.template-card').content;
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

const renderCards = (elem) => {
  elem.forEach( item => {
    const elementClone = elementTemplate.cloneNode(true);
    elementClone.querySelector('.element__title').innerText = item.name;
    elementClone.querySelector('.element__image').src = item.link;
    elementClone.querySelector('.element__image').alt = item.name;
    elements.appendChild(elementClone);
  })
};

const editProfile = () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup();
};

const submitForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
};

const openPopup = () => {
  popup.classList.add('popup_opened');
};

const closePopup = () => {
  popup.classList.remove('popup_opened');
};
renderCards(initialCards);
buttonEditProfile.addEventListener('click', editProfile);
buttonClosePopup.addEventListener('click', closePopup);
popupForm.addEventListener('submit', submitForm);

