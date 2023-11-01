import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product';
import { cartItem } from '../../models/cart';

export const AddToCart = createAction(
  '[Shopping Cart] Add To Cart',
  props<{ item: cartItem }>()
);

export const RemoveFromCart = createAction(
  '[Shopping Cart] Remove From Cart',
  props<{ productId: number }>()
);

export const updateCartItemQuantiy = createAction(
  '[Shopping Cart] Update Quantity',
  props<{ productId: number; quantity: number }>()
);
