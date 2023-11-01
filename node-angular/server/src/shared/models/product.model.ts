import { PagingRequestModel, PagingResponseModel } from ".";
export interface ProductModel {
  _id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  countInStock: number;
}

export interface wishlistItem {
  _id: string;
  idUser: string;
  idProduct: string;
  name: string;
  price: number;
  inStock: boolean;
  image: string;
  brand: string;
}

export interface wishlistRequestModel {
  idUser: string;
  idProduct: string;
}

export interface productsRequestModel extends PagingRequestModel {
  searchText: string;
  category: string;
  brand: string;
  sortPrice: string;
}

export interface productsResponseModel
  extends PagingResponseModel<ProductModel> {}
