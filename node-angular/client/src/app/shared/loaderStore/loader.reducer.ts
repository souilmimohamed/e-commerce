import { createReducer, on } from '@ngrx/store';
import { SetLoading } from './loader.action';

export interface LoadingState {
  isLoading: boolean;
}

export const initialState: Readonly<LoadingState> = {
  isLoading: false,
};

export const loadingReducer = createReducer(
  initialState,
  on(SetLoading, (state, { isLoading }) => {
    return {
      ...state,
      ...isLoading,
    };
  })
);
