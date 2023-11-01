export interface LoginResponseModel {
  Username: string;
  Email: string;
  Token: string;
}

export interface RegsiterModel extends LoginModel {
  Username: string;
}

export interface LoginModel {
  Email: string;
  Password: string;
}
