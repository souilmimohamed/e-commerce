import { createReducer, on } from '@ngrx/store';
import { wishlistItem } from './wishlist';
import {
  DeleteFromWishlistSuccess,
  FetchWishlistAPISuccess,
  SaveNewWishlistItemSuccess,
} from './wishlist.action';
import { Products, Wishlist } from 'src/app/products/store/products';

export const initialState: ReadonlyArray<Wishlist> = [];

export const WishlistReducer = createReducer(
  initialState,
  on(FetchWishlistAPISuccess, (state, { items }) => {
    return items;
  }),
  on(SaveNewWishlistItemSuccess, (state, { item }) => {
    let newState = [...state];
    if (item) newState.unshift(item);
    return newState;
  }),
  on(DeleteFromWishlistSuccess, (state, { id }) => {
    let newState = state.filter((_) => _.WishlistItemId != id);
    return newState;
  })
);
