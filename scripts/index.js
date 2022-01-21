const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('popup__form')
const buttonClosePopup = document.querySelector('.popup__button-close');
const buttonSubmitPopupForm = document.querySelector('.popup__button-submit');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddProfile = document.querySelector('.profile__button-add');
const inputName = document.querySelector('.popup__input_name');
const inputAbout = document.querySelector('.popup__input_about');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const editProfile = () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup();
};

const addProfile = () => {
  inputName.value = '';
  inputAbout.value = '';
  inputName.setAttribute('placeholder', 'Введите имя');
  inputAbout.setAttribute('placeholder', 'О себе');
  openPopup();
  buttonSubmitPopupForm.addEventListener('click', submitForm);

};

const submitForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
};

const closePopupByClickArea = (e) => {
  if(e.target === e.currentTarget) {
    closePopup();
  }
};

const openPopup = () => {
  popup.classList.add('popup_opened');
};

const closePopup = () => {
  popup.classList.remove('popup_opened');
};

popup.addEventListener('click', closePopupByClickArea)
buttonEditProfile.addEventListener('click', editProfile);
// buttonAddProfile.addEventListener('click', addProfile);
buttonClosePopup.addEventListener('click', closePopup);
buttonSubmitPopupForm.addEventListener('click', submitForm);
