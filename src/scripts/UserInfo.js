export default class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }
  
  getUserInfo() {
    const data = {};
    data.userName = this._userName.textContent;
    data.userInfo = this._userInfo.textContent;
    return data;
  }

  setUserInfo({userName, userInfo}) {
    this._userName.textContent = userName;
    this._userInfo.textContent = userInfo;
  }
}