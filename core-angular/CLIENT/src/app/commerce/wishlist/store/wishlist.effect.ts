import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from '../../services/whishlist.service';
import {
  AddToWishlistAPISuccess,
  InvokeAddToWishlistAPI,
  InvokeRemoveFromWishlitAPI,
  InvokeWishlistAPI,
  RemoveFromWishlitAPISuccess,
  WishlistAPISuccess,
} from './wishlist.action';
import { elementAt, map, switchMap } from 'rxjs/operators';

@Injectable()
export class WishlistEffect {
  constructor(
    private actions$: Actions,
    private totastrService: ToastrService,
    private wishlistService: WhishlistService
  ) {}

  wishlist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeWishlistAPI),
      switchMap((action) => {
        return this.wishlistService.getWishlist().pipe(
          map((data) => {
            if (data.Success) {
              return WishlistAPISuccess({ items: data.Body });
            } else return WishlistAPISuccess({ items: [] });
          })
        );
      })
    );
  });

  addToWishlist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeAddToWishlistAPI),
      switchMap((action) => {
        return this.wishlistService.addToWishList(action.id).pipe(
          map((data) => {
            if (data.Success) {
              this.totastrService.success(
                'Item added to your wishlist',
                'SUCCESS'
              );
              return AddToWishlistAPISuccess({ item: data.Body });
            } else return AddToWishlistAPISuccess({ item: data.Body });
          })
        );
      })
    );
  });

  removeFromWishlist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeRemoveFromWishlitAPI),
      switchMap((action) => {
        return this.wishlistService.removeFromWishlist(action.id).pipe(
          map((data) => {
            if (data.Success) {
              this.totastrService.success(
                'Item removed from your wishlist',
                'SUCCESS'
              );
              return RemoveFromWishlitAPISuccess({ id: data.Body });
            } else return RemoveFromWishlitAPISuccess({ id: -1 });
          })
        );
      })
    );
  });
}
