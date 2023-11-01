import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginModel,
  LoginResponseModel,
  RegsiterModel,
} from './models/registerModel';
import { environment } from 'src/environments/environment';
import { HttpResponseModel } from '../shared/models/httpResponseModel';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(private http: HttpClient) {}

  module = 'Identity/Users';
  register(data: RegsiterModel) {
    return this.http.post<HttpResponseModel<LoginResponseModel>>(
      `${environment.ApiEndpoint}${this.module}/RegisterUser`,
      data
    );
  }
  login(data: LoginModel) {
    return this.http.post<HttpResponseModel<LoginResponseModel>>(
      `${environment.ApiEndpoint}${this.module}/Login`,
      data
    );
  }
}
