export default class UserInfo {
  constructor(nameSelector, bioSelector, avatar) {
  this._nameSelector = nameSelector;
  this._bioSelector = bioSelector;
  this._avatar = avatar;
}
  getUserInfo() {
   const userInfo = {};
   userInfo.name = this._nameSelector.textContent;
   userInfo.about = this._bioSelector.textContent;
   userInfo.id = this._id;
   userInfo.avatar = this._avatar;
   return userInfo;
  }
  setUserInfo(name, about, id) {
    this._nameSelector.textContent = name;
    this._bioSelector.textContent = about;
    this._id = id;
  }
  setAvatar(link) {
    this._avatar.src = link;
  }
 getId() {
   return this._id
 }
}
