import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthCredentials, LoginResponse } from './auth';
import { ResponseModel } from '../shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  module = 'Identity/Users';

  login(credentials: AuthCredentials) {
    return this.http.post<ResponseModel<LoginResponse>>(
      `${environment.apiEndpoint}/${this.module}/Login`,
      credentials
    );
  }
}
