import { createAction, props } from '@ngrx/store';
import { WishlistItem } from '../../models/wishlist';

export const InvokeWishlistAPI = createAction(
  '[Wishlist API] Invoke Wishlist API'
);

export const WishlistAPISuccess = createAction(
  '[Wishlist API] Wishlist API Success',
  props<{ items: WishlistItem[] }>()
);

export const InvokeAddToWishlistAPI = createAction(
  '[Wishlist API] Invoke Add To Wishlist API',
  props<{ id: number }>()
);

export const AddToWishlistAPISuccess = createAction(
  '[Wishlist API] Add to wishlist API Success',
  props<{ item: WishlistItem }>()
);

export const InvokeRemoveFromWishlitAPI = createAction(
  '[Wishlist API] Invoke Remove From Wishlist API',
  props<{ id: number }>()
);

export const RemoveFromWishlitAPISuccess = createAction(
  '[Wishlist API] Remove From Wishlist API Success',
  props<{ id: number }>()
);
