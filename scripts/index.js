const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form')
const buttonClosePopup = document.querySelector('.popup__button-close');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const inputName = document.querySelector('.popup__input_field_name');
const inputAbout = document.querySelector('.popup__input_field_about');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

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

buttonEditProfile.addEventListener('click', editProfile);
buttonClosePopup.addEventListener('click', closePopup);
popupForm.addEventListener('submit', submitForm);

