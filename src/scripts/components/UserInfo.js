export default class UserInfo {
  constructor(userNameSelector, userInfoSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userInfo: this._userInfo.textContent
    }
  }

  getMyId() {
    return this.myId;
  }

  setUserInfo({ userName, userInfo, userId }) {
    this._userName.textContent = userName;
    this._userInfo.textContent = userInfo;
    this.myId = userId;
  }

  setUserAvatar(url) {
    this._userAvatar.src = url;
  }
}