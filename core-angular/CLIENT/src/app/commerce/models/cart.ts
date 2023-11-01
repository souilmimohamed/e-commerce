import { Product } from './product';

export interface cartItem {
  productId: number;
  name: string;
  brand: string;
  category: string;
  photoUrl: string;
  price: number;
  quantity: number;
}

export class cartItem {
  constructor(product: Product, quantity: number) {
    this.productId = product.Id;
    this.name = product.Name;
    this.brand = product.BrandName;
    this.category = product.Categoryname;
    this.photoUrl = product.PhotoUrl;
    this.price = product.Price;
    this.quantity = quantity;
  }
}
