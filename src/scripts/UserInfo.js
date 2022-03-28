export class UserInfo {
  constructor({profileName , profileAbout}) {
    this._profileName = document.querySelector(profileName);
    this._profileAbout = document.querySelector(profileAbout);
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
}
