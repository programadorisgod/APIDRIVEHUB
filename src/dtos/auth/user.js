export class  UserDto {
  constructor(user) {
    this._id = user._id;
    this.avatar = user.avatar;
    this.userName = user.userName;
    this.email = user.email;
    this.directories = user.directories;
    this.premium = user.premium;
    this.space = user.space;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
