import { createAction, props } from '@ngrx/store';
import { filter, Products } from './products';

export const InvokeProductsAPI = createAction(
  '[Products API] Invoke Products Fetch API',
  props<{ filter: filter }>()
);
export const FetchProductsAPISuccess = createAction(
  '[Products API] Fetch Products API Success',
  props<{ products: Products[] }>()
);

export const InvokeSaveNewProductAPI = createAction(
  '[Products API] Invoke Save products API',
  props<{ product: Products }>()
);
export const SaveNewproductAPISuccess = createAction(
  '[Products API] save new product API success',
  props<{ product: Products }>()
);

export const InvokeProductsSearch = createAction(
  '[Products API] Invoke Products earch',
  props<{ filter: filter }>()
);
export const ProductsSearchSuccess = createAction(
  '[Products API] Search Products Success',
  props<{ products: Products[] }>()
);
