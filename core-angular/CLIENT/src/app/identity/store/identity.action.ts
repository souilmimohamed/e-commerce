import { createAction, props } from '@ngrx/store';
import {
  LoginModel,
  LoginResponseModel,
  RegsiterModel,
} from '../models/registerModel';
import { ResponseError } from 'src/app/shared/models/httpResponseModel';

export const InvokeLoginAPI = createAction(
  '[Login API] Invoke Login API',
  props<{ credentials: LoginModel }>()
);

export const LoginAPISuccess = createAction(
  '[Login API] Login API Success',
  props<{ access: LoginResponseModel }>()
);

export const LoginAPIFailure = createAction(
  '[Login API] Login API Failure',
  props<{ message: string | ResponseError }>()
);

export const InvokeRegisterAPI = createAction(
  '[Register API] Invoke Register API',
  props<{ credentials: RegsiterModel }>()
);

export const RegisterAPISuccess = createAction(
  '[Register API] Register API Success',
  props<{ access: LoginResponseModel }>()
);

export const RegisterAPIFailure = createAction(
  '[Register API] Register API Failure',
  props<{ message: string | ResponseError }>()
);
export const Logout = createAction('[Login API] Logout');
