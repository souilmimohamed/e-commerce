import { createAction, props } from '@ngrx/store';
import {
  Brand,
  Category,
  Product,
  filter,
  productsResponseModel,
} from '../../models/product';

export const InvokeProductAPI = createAction(
  '[Product API] Invoke Products Fetch API',
  props<{ filter: filter }>()
);

export const FetchProductAPISuccess = createAction(
  '[Product API] Fetch Products API Suceess',
  props<{ products: productsResponseModel }>()
);

export const InvokeCategoryAPI = createAction(
  '[Category API] Invoke Category Fetch API'
);
export const FetchCategoryAPISuccess = createAction(
  '[Category API] Fetch Category API Success',
  props<{ categories: Category[] }>()
);

export const InvokeBrandAPI = createAction(
  '[Brand API] Invoke Brand Fetch API'
);
export const FetchBrandAPISuccess = createAction(
  '[Brand API] Fetch Brand API Success',
  props<{ brands: Brand[] }>()
);
