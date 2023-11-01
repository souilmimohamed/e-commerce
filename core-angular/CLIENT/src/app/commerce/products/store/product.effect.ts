import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services/product.service';
import {
  FetchBrandAPISuccess,
  FetchCategoryAPISuccess,
  FetchProductAPISuccess,
  InvokeBrandAPI,
  InvokeCategoryAPI,
  InvokeProductAPI,
} from './product.action';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  products$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeProductAPI),
      switchMap((action) => {
        return this.productService.getProducts(action.filter).pipe(
          map((data) => {
            if (data.Success) {
              return FetchProductAPISuccess({ products: data.Body });
            } else
              return FetchProductAPISuccess({
                products: {
                  CurrentPage: 0,
                  Items: [],
                  PageSize: 0,
                  TotalCount: 0,
                  TotalPages: 0,
                },
              });
          })
        );
      })
    );
  });

  brands$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeBrandAPI),
      switchMap((action) => {
        return this.productService.getBrands().pipe(
          map((data) => {
            if (data.Success) {
              return FetchBrandAPISuccess({ brands: data.Body });
            } else return FetchBrandAPISuccess({ brands: [] });
          })
        );
      })
    );
  });

  categoreis$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeCategoryAPI),
      switchMap((action) => {
        return this.productService.getCategories().pipe(
          map((data) => {
            if (data.Success) {
              return FetchCategoryAPISuccess({ categories: data.Body });
            } else return FetchCategoryAPISuccess({ categories: [] });
          })
        );
      })
    );
  });
}
