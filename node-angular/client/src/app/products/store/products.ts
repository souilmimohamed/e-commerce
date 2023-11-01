import { PagingRequestModel, PagingResponseModel } from 'src/app/shared/models';

export interface Products {
  Id: number;
  Name: string;
  PhotoUrl: string;
  Brand: string;
  Category: string;
  Description: string;
  Price: number;
  InStock: boolean;
}

export interface Brand {
  Id: number;
  BrandName: string;
}
export interface Category {
  Id: number;
  CategoryName: string;
}

export interface filter extends PagingRequestModel {
  SearchText: string;
  Category: string;
  Brand: string;
  SortPrice: string;
}

export interface productsResponseModel extends PagingResponseModel<Products> {}

export interface Wishlist extends Products {
  WishlistItemId: number;
}
