import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Products } from './products';
export const selectProducts = createFeatureSelector<Products[]>('myproducts');
