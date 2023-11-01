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
