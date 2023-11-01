import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  RemoveFromCart,
  updateCartItemQuantiy,
} from 'src/app/commerce/cart/store/cart.action';
import { cartItem } from 'src/app/commerce/models/cart';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() item: cartItem;
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  itemQuantityUpdate(quantity: number) {
    this.store.dispatch(
      updateCartItemQuantiy({ productId: this.item.productId, quantity })
    );
  }

  removeItem() {
    this.store.dispatch(RemoveFromCart({ productId: this.item.productId }));
  }
  goToProduct() {
    this.router.navigate(['/detail/' + this.item.productId]);
  }
}
