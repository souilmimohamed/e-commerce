import { createReducer, on } from '@ngrx/store';
import {
  LoginAPIFailure,
  LoginAPISuccess,
  Logout,
  RegisterAPIFailure,
  RegisterAPISuccess,
} from './identity.action';
import { ResponseError } from 'src/app/shared/models/httpResponseModel';

export interface IdentityState {
  token: string;
  isLoggedIn: boolean;
  message: string | ResponseError;
  username: string;
  email: string;
}

export const intialState: IdentityState = {
  token: '',
  isLoggedIn: false,
  email: '',
  message: '',
  username: '',
};

export const IdentityReducer = createReducer(
  intialState,
  on(LoginAPISuccess, (state, { access }) => {
    return {
      ...state,
      isLoggedIn: true,
      email: access.Email,
      username: access.Username,
      message: '',
      token: access.Token,
    };
  }),
  on(LoginAPIFailure, (state, { message }) => {
    return {
      ...state,
      isLoggedIn: false,
      email: '',
      message,
      token: '',
      username: '',
    };
  }),
  on(RegisterAPISuccess, (state, { access }) => {
    return {
      ...state,
      email: access.Email,
      isLoggedIn: true,
      message: '',
      token: access.Token,
      username: access.Username,
    };
  }),
  on(RegisterAPIFailure, (state, { message }) => {
    return {
      ...state,
      email: '',
      isLoggedIn: false,
      message: message,
      token: '',
      username: '',
    };
  }),
  on(Logout, (state) => {
    return {
      ...state,
      email: '',
      isLoggedIn: false,
      message: '',
      token: '',
      username: '',
    };
  })
);
