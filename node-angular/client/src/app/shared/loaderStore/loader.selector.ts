import { createFeatureSelector } from '@ngrx/store';
import { LoadingState } from './loader.reducer';

export const selectLoadingState =
  createFeatureSelector<LoadingState>('loading');
