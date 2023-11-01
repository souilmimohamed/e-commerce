import { cartItem } from '../../models/cart';
import { createReducer, on } from '@ngrx/store';
import {
  AddToCart,
  RemoveFromCart,
  updateCartItemQuantiy,
} from './cart.action';

function isInCart(cart: cartItem[], item: cartItem): boolean {
  return cart.some((_item) => _item.productId === item.productId);
}

export interface CartState {
  items: cartItem[];
}

export const initialState: CartState = {
  items: [],
};

export const CartReducer = createReducer(
  initialState,
  on(AddToCart, (state, { item }) => {
    if (isInCart(state.items, item)) return state;
    else return { items: [...state.items, item] };
  }),
  on(RemoveFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter((_item) => _item.productId !== productId),
  })),
  on(updateCartItemQuantiy, (state, { productId, quantity }) => {
    const index = state.items.findIndex((_item) => {
      return _item.productId === productId;
    });
    const itemToUpdate = state.items[index];
    const updatedItem = { ...itemToUpdate, quantity };
    const newItems = [
      ...state.items.slice(0, index),
      updatedItem,
      ...state.items.slice(index + 1),
    ];
    if (updatedItem.quantity === 0)
      return {
        items: newItems.filter(
          (_item) => _item.productId !== updatedItem.productId
        ),
      };
    else return { items: newItems };
  })
);
