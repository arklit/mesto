export default class UserInfo {
  constructor(nameSelector, bioSelector) {
  this._nameSelector = nameSelector;
  this._bioSelector = bioSelector;
}
getUserInfo() {
 const userInfo = {};
 userInfo.name = this._nameSelector.textContent;
 userInfo.biography = this._bioSelector.textContent;
 return userInfo;
}
setUserInfo(nameInput, bioInput) {
  this._nameSelector.textContent = nameInput;
  this._bioSelector.textContent = bioInput;
}
}
