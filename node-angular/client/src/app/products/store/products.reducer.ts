import { createReducer, on } from '@ngrx/store';
import { Products, filter } from './products';
import {
  FetchProductsAPISuccess,
  ProductsSearchSuccess,
  SaveNewproductAPISuccess,
} from './products.action';

export interface ProductState {
  products: Products[];
  filter: filter;
}
export const initialState: ReadonlyArray<Products> = [];

export const ProductsReducer = createReducer(
  initialState,
  on(FetchProductsAPISuccess, (state, { products }) => {
    return [...state, ...products];
  }),
  on(ProductsSearchSuccess, (state, { products }) => {
    return [...products];
  }),
  on(SaveNewproductAPISuccess, (state, { product }) => {
    let newState = [...state];
    newState.unshift(product);
    return newState;
  })
);
