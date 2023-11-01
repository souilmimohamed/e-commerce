import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartState } from './store/cart.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart$ = this.cartStore.select((state) => state.cart.items);
  cartTotal: Observable<number>;
  totalPlusShipping: Observable<number>;
  shipping: number = 0;
  constructor(private cartStore: Store<{ cart: CartState }>) {}

  ngOnInit(): void {
    this.cartTotal = this.cart$.pipe(
      map((res) =>
        res.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0)
      )
    );
    this.totalPlusShipping = this.cart$.pipe(
      map(
        (res) =>
          res.reduce((acc, item) => {
            return acc + item.price * item.quantity;
          }, 0) + this.shipping
      )
    );
  }
  shippingChange(event: any) {
    this.totalPlusShipping = this.cart$?.pipe(
      map(
        (res) =>
          res.reduce((accumulator, item) => {
            return accumulator + item.price * item.quantity;
          }, 0) + Number(event)
      )
    );
  }
}
