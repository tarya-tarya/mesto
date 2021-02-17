export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка, чёрт побери: ${res.status}`);
    })
  }

  getMyInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка, чёрт побери: ${res.status}`);
    })
  }

  editProfile(name, about) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name, 
        about
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка, чёрт побери: ${res.status}`);
    })
  }

  addCard({name, link, id}) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({name, link, id})
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка, сэр: ${res.status}`);
    })
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

getMyInfo() {
  return fetch(`${this._url}users/me`, {
    method: "GET",
    headers: this._headers
  })
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка, чёрт побери: ${res.status}`);
  })
}

putLike(id) {
  return fetch(`${this._url}cards/likes/${id}`, {
    method: "PUT",
    headers: this._headers
  })
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка, чёрт побери: ${res.status}`);
  })
} 

deleteLike(id) {
  return fetch(`${this._url}cards/likes/${id}`, {
    method: "DELETE",
    headers: this._headers
  })
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка, чёрт побери: ${res.status}`);
  })
}

updateAvatar(url) {
  return fetch(`${this._url}users/me/avatar`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка, чёрт побери: ${res.status}`);
  })
}

}