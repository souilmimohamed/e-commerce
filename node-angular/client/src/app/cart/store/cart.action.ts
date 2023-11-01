import { createAction, props } from '@ngrx/store';
import { cartItem } from './cart';

export const addToCart = createAction(
  '[Shopping Cart] Add Item',
  props<{ item: cartItem }>()
);

export const removeFromCart = createAction(
  '[Shopping Cart] Remove Item',
  props<{ _id: string }>()
);

export const updateCartItemQuantity = createAction(
  '[Shopping Cart] Update Item Quantity',
  props<{ _id: string; quantity: number }>()
);

export const emptyCart = createAction('[Shopping Cart] Empty Cart');
