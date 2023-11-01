import { createReducer, on } from '@ngrx/store';
import { AuthAPIFailure, AuthAPISuccess, Logout } from './auth.action';

export interface AuthState {
  token: string;
  isLoggedIn: boolean;
  message: string;
  username: string;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  token: '',
  message: '',
  username: '',
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthAPISuccess, (state, { token, username }) => {
    return {
      ...state,
      isLoggedIn: true,
      token: token,
      message: '',
      username: username,
    };
  }),
  on(AuthAPIFailure, (state, { message }) => {
    return {
      ...state,
      isLoggedIn: false,
      token: '',
      username: '',
      message: message,
    };
  }),
  on(Logout, (state) => {
    return {
      ...state,
      isLoggedIn: false,
      token: '',
    };
  })
);
