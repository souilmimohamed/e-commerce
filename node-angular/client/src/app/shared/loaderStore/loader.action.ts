import { createAction, props } from '@ngrx/store';
import { LoadingState } from './loader.reducer';

export const SetLoading = createAction(
  '[Loading] set loading',
  props<{ isLoading: LoadingState }>()
);
