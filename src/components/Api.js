const templateFetch = (url, props = {}) => {
  return fetch(url, {
    method: props.method,
    headers: props.headers,
    body:props.body
  })
    .then( res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .catch(err => console.log(err))
}

class Api {
  constructor(settings) {
    this.settings = settings;
  }

  getProfile() {
    return  templateFetch(`${this.settings.baseUrl}/users/me`, {
      headers: this.settings.headers,
    })
  }

  editProfile(user) {
    return templateFetch(`${this.settings.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.settings.headers,
      body: JSON.stringify({name:user.name, about: user.about})
    })
  }

  updateAvatar(link){
    return templateFetch(`${this.settings.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.settings.headers,
      body: JSON.stringify({avatar:link})
    })
  }

  getCards() {
    return templateFetch(`${this.settings.baseUrl}/cards`, {
      headers: this.settings.headers
    })
  }

  addCard(card) {
    return templateFetch(`${this.settings.baseUrl}/cards`, {
      method: "POST",
      headers: this.settings.headers,
      body: JSON.stringify({name: card.name, link: card.link})
    })
}

  deleteCard(id) {
    return fetch(`${this.settings.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.settings.headers,

    })
      .then( res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  }

  addLike(id) {
    //PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
    return templateFetch(`${this.settings.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.settings.headers
    })
  }
  deleteLike(id) {
    //DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
    return templateFetch(`${this.settings.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.settings.headers
    })
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: '026e3cd0-c777-4ed1-873d-bcc2b8a959a1',
    'Content-Type': 'application/json'
  }
})

//
// fetch('https://mesto.nomoreparties.co/v1/cohort-39/cards', {
//   headers: {
//     authorization: '026e3cd0-c777-4ed1-873d-bcc2b8a959a1'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });
/*about: "Sailor, researcher"
avatar: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg"
cohort: "cohort-39"
name: "Jacques Cousteau"
_id: "b09de70db0d55c7075386790"*/
