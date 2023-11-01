import { createReducer, on } from '@ngrx/store';
import { cartItem } from './cart';
import {
  addToCart,
  emptyCart,
  removeFromCart,
  updateCartItemQuantity,
} from './cart.action';

function isInCart(cartItems: cartItem[], itemToAdd: cartItem): boolean {
  return cartItems.some((item) => item.id === itemToAdd.id);
}
export interface CartState {
  items: cartItem[];
}

export const initialState: CartState = {
  items: [],
};

export const CartReducer = createReducer(
  initialState,
  on(addToCart, (state, { item }) => {
    if (isInCart(state.items, item)) {
      return state; // If item is already in cart, return the current state
    } else {
      return { items: [...state.items, item] }; // Otherwise, add the item to the cart
    }
  }),
  on(removeFromCart, (state, { _id }) => ({
    ...state,
    items: state.items.filter((_) => _.id !== _id),
  })),
  on(updateCartItemQuantity, (state, { _id, quantity }) => {
    const index = state.items.findIndex((object) => {
      return object.id === _id;
    });
    const itemToUpdate = state.items[index];
    const updatedItem = { ...itemToUpdate, quantity };
    const updatedItems = [
      ...state.items.slice(0, index),
      updatedItem,
      ...state.items.slice(index + 1),
    ];
    if (updatedItem.quantity === 0) {
      return {
        items: updatedItems.filter((item) => item.id !== updatedItem.id),
      };
    } else {
      return { items: updatedItems };
    }
  }),
  on(emptyCart, (state) => ({ ...state, items: [] }))
);
