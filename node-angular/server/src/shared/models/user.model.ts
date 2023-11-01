export interface UserModel {
  _id: string;
  email: string;
  password: string;
  fullname: string;
  isAdmin: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}
