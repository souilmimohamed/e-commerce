import { createAction, props } from '@ngrx/store';
import { AppState } from './app.state';

export const setAPIStatus = createAction(
  '[API] Success or Failure Status',
  props<{ apiStatus: AppState }>()
);
