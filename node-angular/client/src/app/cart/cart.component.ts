import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { cartItem } from './store/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private store: Store<{ cart: { items: cartItem[] } }>) {}
  cartItems$?: Observable<cartItem[]>;
  cartTotal?: Observable<number>;
  shipping: number = 0;
  TotalPlusShipping?: Observable<number>;
  ngOnInit(): void {
    this.cartItems$ = this.store.select((state) => state.cart.items);
    this.cartTotal = this.cartItems$.pipe(
      map((res) =>
        res.reduce((accumulator, item) => {
          return accumulator + item.price * item.quantity;
        }, 0)
      )
    );
    this.TotalPlusShipping = this.cartItems$.pipe(
      map(
        (res) =>
          res.reduce((accumulator, item) => {
            return accumulator + item.price * item.quantity;
          }, 0) + this.shipping
      )
    );
  }

  shippingChange(event: any) {
    this.TotalPlusShipping = this.cartItems$?.pipe(
      map(
        (res) =>
          res.reduce((accumulator, item) => {
            return accumulator + item.price * item.quantity;
          }, 0) + Number(event)
      )
    );
  }
}
