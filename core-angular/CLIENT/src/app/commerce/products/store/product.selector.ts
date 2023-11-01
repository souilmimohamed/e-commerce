import { createFeatureSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProducts = createFeatureSelector<ProductState>('product');
