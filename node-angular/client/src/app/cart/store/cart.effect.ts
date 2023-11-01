import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { map, switchMap, tap } from 'rxjs';
import { CartService } from './cart.service';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from './cart.action';

@Injectable()
export class CartEffect {
  constructor(private actions$: Actions, private cartService: CartService) {}
  addToCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToCart),
        tap(({ item }) => {
          this.cartService.addItem(item);
        })
      ),
    { dispatch: false }
  );

  removeFromCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeFromCart),
        tap(({ _id }) => this.cartService.removeItem(_id))
      ),
    { dispatch: false }
  );

  updateCartItemQuantity$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCartItemQuantity),
        tap(({ _id, quantity }) =>
          this.cartService.updateQuantity(_id, quantity)
        )
      ),
    { dispatch: false }
  );
}
