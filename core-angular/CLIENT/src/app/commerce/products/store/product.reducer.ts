import { createReducer, on } from '@ngrx/store';
import { Brand, Category, Product } from '../../models/product';
import {
  FetchBrandAPISuccess,
  FetchCategoryAPISuccess,
  FetchProductAPISuccess,
} from './product.action';

export interface ProductState {
  products: Product[];
  brands: Brand[];
  categories: Category[];
  totalCount: number;
  totalPages: number;
}

export const intialState: ProductState = {
  brands: [],
  categories: [],
  products: [],
  totalCount: 0,
  totalPages: 0,
};

export const ProductReducer = createReducer(
  intialState,
  on(FetchProductAPISuccess, (state, { products }) => {
    return {
      ...state,
      products: products.Items,
      totalCount: products.TotalCount,
      totalPages: products.TotalPages,
    };
  }),
  on(FetchCategoryAPISuccess, (state, { categories }) => {
    return { ...state, categories };
  }),
  on(FetchBrandAPISuccess, (state, { brands }) => {
    return { ...state, brands };
  })
);
