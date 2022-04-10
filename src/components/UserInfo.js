
export class UserInfo {
  constructor({profileName , profileAbout ,profileAvatar}, handlerAvatar) {
    this._profileName = document.querySelector(profileName);
    this._profileAbout = document.querySelector(profileAbout);
    this._profileAvatar = document.querySelector(profileAvatar);
    this._handlerAvatar = handlerAvatar;
  }

  getUserInfo() { //возвращаем данные пользователя
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    }
  }

  setUserInfo(name , about) { //добавляем данные пользователя на страницу
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }

  setUserAvatar(link){
    this._profileAvatar.src = link;
  }

  setEventListeners() {
    this._profileAvatar.addEventListener('click', () => {
      this._handlerAvatar()
    })
  }
}
