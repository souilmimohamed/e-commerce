import { createAction, props } from '@ngrx/store';
import { Wishlist } from 'src/app/products/store/products';

export const InvokeWishlistAPI = createAction(
  '[Wishlist API] Invoke Wishlist API'
);

export const FetchWishlistAPISuccess = createAction(
  '[Wishlist API] Fetch Wishlist API Success',
  props<{ items: Wishlist[] }>()
);

export const InvokeSaveNewWishlistItemAPI = createAction(
  '[Wishlist API] Invoke Save New WishlistItem API',
  props<{ id: number }>()
);

export const SaveNewWishlistItemSuccess = createAction(
  '[Wishlist API] Save New WishlistIem API',
  props<{ item: Wishlist }>()
);

export const InvokeDeleteFromWishlistAPI = createAction(
  '[Wishlist API] Invoke Delete From Wishlist API',
  props<{ id: number }>()
);

export const DeleteFromWishlistSuccess = createAction(
  '[Wishist API] Delete From Wishlist API Success',
  props<{ id: number }>()
);
