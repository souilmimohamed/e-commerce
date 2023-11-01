import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../../services/cart.service';
import {
  AddToCart,
  RemoveFromCart,
  updateCartItemQuantiy,
} from './cart.action';
import { tap } from 'rxjs/operators';

@Injectable()
export class CartEffect {
  constructor(private actions$: Actions, private cartService: CartService) {}

  addToCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AddToCart),
        tap(({ item }) => {
          this.cartService.addCartItem(item);
        })
      ),
    { dispatch: false }
  );

  removeFromCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RemoveFromCart),
        tap(({ productId }) => this.cartService.removeItemFromCart(productId))
      ),
    { dispatch: false }
  );

  updateCartItemQuatity$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCartItemQuantiy),
        tap(({ productId, quantity }) =>
          this.cartService.updateCartItemQuantiy(productId, quantity)
        )
      ),
    { dispatch: false }
  );
}
