import { createFeatureSelector } from '@ngrx/store';
import { cartItem } from '../../models/cart';

export const selectCart = createFeatureSelector<cartItem[]>('cart');
