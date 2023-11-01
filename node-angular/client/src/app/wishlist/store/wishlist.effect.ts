import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WishlistService } from '../wishlist.service';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import {
  DeleteFromWishlistSuccess,
  FetchWishlistAPISuccess,
  InvokeDeleteFromWishlistAPI,
  InvokeSaveNewWishlistItemAPI,
  InvokeWishlistAPI,
  SaveNewWishlistItemSuccess,
} from './wishlist.action';
import { map, switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { LoadingState } from 'src/app/shared/loaderStore/loader.reducer';
import { SetLoading } from 'src/app/shared/loaderStore/loader.action';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class WishlistEffect {
  constructor(
    private actions$: Actions,
    private wishlistService: WishlistService,
    private appStore: Store<Appstate>,
    private loadingStore: Store<LoadingState>,
    private toaster: ToastrService
  ) {}

  loadWishlist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeWishlistAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: [], apiStatus: '' } })
        );
        this.setLoadingState(true);
        return this.wishlistService.getWishlist().pipe(
          map((data) => {
            if (data.Success) {
              this.appStore.dispatch(
                setAPIStatus({
                  apiStatus: { apiResponseMessage: [], apiStatus: 'success' },
                })
              );
              this.setLoadingState(false);
              return FetchWishlistAPISuccess({ items: data.Body });
            } else {
              this.appStore.dispatch(
                setAPIStatus({
                  apiStatus: {
                    apiResponseMessage: data.Errors,
                    apiStatus: 'failure',
                  },
                })
              );
              this.setLoadingState(false);
              return FetchWishlistAPISuccess({ items: [] });
            }
          })
        );
      })
    );
  });

  saveNewWishlistItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeSaveNewWishlistItemAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: [], apiStatus: '' } })
        );
        return this.wishlistService.addToWishList(action.id).pipe(
          map((data) => {
            if (data.Success) {
              this.appStore.dispatch(
                setAPIStatus({
                  apiStatus: { apiResponseMessage: [], apiStatus: 'success' },
                })
              );
              this.toaster.success('item added to your wishlist', 'SUCCESS');
              return SaveNewWishlistItemSuccess({ item: data.Body });
            } else {
              this.appStore.dispatch(
                setAPIStatus({
                  apiStatus: {
                    apiResponseMessage: data.Errors,
                    apiStatus: 'failure',
                  },
                })
              );
              return SaveNewWishlistItemSuccess({ item: data.Body });
            }
          })
        );
      })
    );
  });

  deleteFromWishlist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeDeleteFromWishlistAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: [], apiStatus: '' } })
        );
        return this.wishlistService.deleteFromWishList(actions.id).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: [], apiStatus: 'success' },
              })
            );
            return DeleteFromWishlistSuccess({ id: data.Body });
          })
        );
      })
    );
  });
  setLoadingState(state: boolean) {
    this.loadingStore.dispatch(SetLoading({ isLoading: { isLoading: state } }));
  }
}
