import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { cartItem } from '../models/cart';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: cartItem[] = [];
  constructor(private toastrService: ToastrService) {}

  addCartItem(item: cartItem) {
    const check = this.cart?.filter(
      (_item) => _item.productId === item.productId
    );
    if (check && check.length)
      this.toastrService.warning('Item is already in your cart', 'WARINING');
    else {
      this.cart.push(item);
      this.toastrService.success('Item added to your cart', 'SUCCESS');
    }
  }

  removeItemFromCart(id: number) {
    const index = this.cart?.findIndex((_item) => {
      return _item.productId === id;
    });
    this.cart.splice(index, 1);
  }

  updateCartItemQuantiy(id: number, quantity: number) {
    const index = this.cart?.findIndex((_item) => {
      return _item.productId === id;
    });
    this.cart[index].quantity = quantity;
  }
}
