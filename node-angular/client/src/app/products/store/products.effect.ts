import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { ProductsService } from '../products.service';
import {
  FetchProductsAPISuccess,
  InvokeProductsAPI,
  InvokeProductsSearch,
  InvokeSaveNewProductAPI,
  ProductsSearchSuccess,
  SaveNewproductAPISuccess,
} from './products.action';
import { LoadingState } from 'src/app/shared/loaderStore/loader.reducer';
import { SetLoading } from 'src/app/shared/loaderStore/loader.action';

@Injectable()
export class ProductsEffect {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private loadingStore: Store<LoadingState>,
    private appStore: Store<Appstate>
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeProductsAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: [], apiStatus: '' } })
        );
        this.setLoadingState(true);
        return this.productsService.get(action.filter).pipe(
          map((data) => {
            if (data.Success) {
              this.appStore.dispatch(
                setAPIStatus({
                  apiStatus: { apiResponseMessage: [], apiStatus: 'success' },
                })
              );
              this.setLoadingState(false);
              return FetchProductsAPISuccess({ products: data.Body.Items });
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
              return FetchProductsAPISuccess({ products: [] });
            }
          })
        );
      })
    );
  });

  searchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeProductsSearch),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: [], apiStatus: '' } })
        );
        this.setLoadingState(true);
        return this.productsService.get(action.filter).pipe(
          map((data) => {
            if (data.Success) {
              this.appStore.dispatch(
                setAPIStatus({
                  apiStatus: { apiResponseMessage: [], apiStatus: 'success' },
                })
              );
              this.setLoadingState(false);
              return ProductsSearchSuccess({ products: data.Body.Items });
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
              return ProductsSearchSuccess({ products: [] });
            }
          })
        );
      })
    );
  });

  saveNewProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeSaveNewProductAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: [], apiStatus: '' } })
        );
        return this.productsService.create(action.product).pipe(
          map((data) => {
            if (data.Success) {
              this.appStore.dispatch(
                setAPIStatus({
                  apiStatus: { apiResponseMessage: [], apiStatus: 'success' },
                })
              );
            } else {
              this.appStore.dispatch(
                setAPIStatus({
                  apiStatus: {
                    apiResponseMessage: data.Errors,
                    apiStatus: 'failure',
                  },
                })
              );
            }
            return SaveNewproductAPISuccess({ product: data.Body });
          })
        );
      })
    );
  });

  setLoadingState(state: boolean) {
    this.loadingStore.dispatch(SetLoading({ isLoading: { isLoading: state } }));
  }
}
