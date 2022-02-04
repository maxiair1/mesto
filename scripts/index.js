const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form')
const buttonClosePopup = document.querySelector('.popup__button-close');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');
const formTitle = document.querySelector('.popup__title');
const inputName = document.querySelector('.popup__input_field_name');
const inputAbout = document.querySelector('.popup__input_field_about');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.template-card').content;

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

const renderCards = (elem) => {
  clearRenderCards();
  elem.forEach( item => {
    const elementClone = elementTemplate.cloneNode(true);
    elementClone.querySelector('.element__title').innerText = item.name;
    elementClone.querySelector('.element__image').src = item.link;
    elementClone.querySelector('.element__image').alt = item.name;
    elements.appendChild(elementClone);
  });
};

const openEditProfile = () => {
  formTitle.innerText = formEditProfile.title;
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup();
};

const openAddCard = () => {
  formTitle.innerText = formAddCard.title;
  inputName.value = "";
  inputAbout.value = "";
  inputName.placeholder = formAddCard.nameInput;
  inputAbout.placeholder = formAddCard.linkInput;
  openPopup();
};

const submitForm = (evt) => {
  evt.preventDefault();
  if(evt.currentTarget.querySelector('.popup__title').textContent === formEditProfile.title)
    editProfile();
  else if(evt.currentTarget.querySelector('.popup__title').textContent === formAddCard.title)
    addCard(popupForm);
  closePopup();
};

const editProfile = () => {
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
};

const addCard = (formNode) => {
  const { elements } = formNode;
  const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element
      return { name, value };
    });
  initialCards.unshift({name:data[0].value, link: data[1].value});
  renderCards(initialCards);
};

const clearRenderCards = () => {
  elements.querySelectorAll('.element').forEach( i => i.remove());
}

const openPopup = () => {
  popup.classList.add('popup_opened');
};

const closePopup = () => {
  popup.classList.remove('popup_opened');
};

renderCards(initialCards);
buttonEditProfile.addEventListener('click', openEditProfile);
buttonAddCard.addEventListener('click', openAddCard);
buttonClosePopup.addEventListener('click', closePopup);
popupForm.addEventListener('submit', submitForm);

