import { Injectable } from '@angular/core';
import { LoginResponseModel } from 'src/app/identity/models/registerModel';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setUserAccess(userAccess: LoginResponseModel) {
    localStorage.setItem('Token', userAccess.Token);
    localStorage.setItem(
      'userdata',
      JSON.stringify({ username: userAccess.Username, email: userAccess.Email })
    );
  }
  getToken() {
    return localStorage.getItem('Token');
  }
  getUserData() {
    return JSON.parse(localStorage.getItem('userdata')!);
  }
}
