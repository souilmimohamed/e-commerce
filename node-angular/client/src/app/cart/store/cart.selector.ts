import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cartItem } from './cart';

export const selectCart = createFeatureSelector<cartItem[]>('mycart');
