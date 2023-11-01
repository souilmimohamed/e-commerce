import { Injectable } from '@angular/core';
import { cartItem } from './cart';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: cartItem[] = [];
  constructor(private toastr: ToastrService) {}

  addItem(item: cartItem) {
    const check = this.items.filter((_item) => _item.id === item.id);
    if (check && check.length)
      this.toastr.warning('Item is already in your cart', 'WARNING');
    else this.toastr.success('Item added to your cart', 'SUCCESS');
    this.items.push(item);
  }

  removeItem(_id: string) {
    const index = this.items.findIndex((item) => {
      return item.id === _id;
    });
    this.items.splice(index, 1);
  }

  updateQuantity(_id: string, quantity: number) {
    const index = this.items.findIndex((item) => {
      return item.id === _id;
    });
    this.items[index].quantity = quantity;
  }

  emptyCart() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }
}
