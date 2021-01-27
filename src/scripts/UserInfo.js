export default class UserInfo {
  constructor(userName, userInfo) {
    this._userName = userName;
    this._userInfo = userInfo;
  }

  getUserInfo() {
    const data = {};
    data.userName = this._userName.textContent;
    data.userInfo = this._userInfo.textContent;
    return data;
  }

  setUserInfo(userName, userInfo) {
    this._userName.textContent = userName;
    this._userInfo.textContent = userInfo;
  }
}