import { createAction, props } from '@ngrx/store';
import { AuthCredentials } from '../auth';

export const InvokeAuthAPI = createAction(
  '[Auth API] Invoke Auth API',
  props<{ credentilas: AuthCredentials }>()
);

export const AuthAPISuccess = createAction(
  '[Auth API] Auth API Success',
  props<{ token: string; username: string }>()
);

export const AuthAPIFailure = createAction(
  '[Auth API] Auth API Failure',
  props<{ message: string }>()
);

export const Logout = createAction('[Auth API] Logout');
