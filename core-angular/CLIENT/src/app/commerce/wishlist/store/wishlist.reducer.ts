import { createReducer, on } from '@ngrx/store';
import { WishlistItem } from '../../models/wishlist';
import {
  AddToWishlistAPISuccess,
  RemoveFromWishlitAPISuccess,
  WishlistAPISuccess,
} from './wishlist.action';

export interface WishlistState {
  items: WishlistItem[];
}

export const initialState: WishlistState = {
  items: [],
};

export const WishlistReducer = createReducer(
  initialState,
  on(WishlistAPISuccess, (state, { items }) => {
    return { items: items };
  }),
  on(AddToWishlistAPISuccess, (state, { item }) => {
    if (item) return { items: [...state.items, item] };
    else return { items: state.items };
  }),
  on(RemoveFromWishlitAPISuccess, (state, { id }) => ({
    items: state.items.filter((_item) => _item.WishlistItemId !== id),
  }))
);
