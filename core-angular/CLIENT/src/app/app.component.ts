import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IdentityState } from './identity/store/identity.reducer';
import { Logout } from './identity/store/identity.action';
import { CartState } from './commerce/cart/store/cart.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loggedIn$ = this.identityStore.select((state) => state.identity.isLoggedIn);
  cart$ = this.cartStore.select((state) => state.cart.items);
  constructor(
    private identityStore: Store<{ identity: IdentityState }>,
    private cartStore: Store<{ cart: CartState }>,
    private store: Store
  ) {}
  logout() {
    this.store.dispatch(Logout());
    location.reload();
  }
}
