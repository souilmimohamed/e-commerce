import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { cartItem } from 'src/app/cart/store/cart';
import {
  removeFromCart,
  updateCartItemQuantity,
} from 'src/app/cart/store/cart.action';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  constructor(private store: Store, private router: Router) {}
  @Input()
  cartItem?: cartItem;

  onDeleteItem(_id: string) {
    this.store.dispatch(removeFromCart({ _id }));
  }
  onItemQuantityUpdate(_id: string, quantity: number) {
    this.store.dispatch(updateCartItemQuantity({ _id, quantity }));
  }
  GoToProduct(_id: string) {
    this.router.navigate([`products/details/${_id}`]);
  }
}
