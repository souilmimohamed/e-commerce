import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cartItem } from './cart/store/cart';
import { AuthState } from './auth/store/auth.reducer';
import { Logout } from './auth/store/auth.action';
import { CartState } from './cart/store/cart.reducer';
import { LoadingState } from './shared/loaderStore/loader.reducer';
import { selectLoadingState } from './shared/loaderStore/loader.selector';
import { filter } from './products/store/products';
import { InvokeProductsSearch } from './products/store/products.action';
import { wishlistItem } from './wishlist/store/wishlist';
import { InvokeWishlistAPI } from './wishlist/store/wishlist.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private cartStore: Store<{ cart: CartState }>,
    private authStore: Store<{ auth: AuthState }>,
    private loadingStore: Store<LoadingState>,
    private wishlistStore: Store<{ wishlist: wishlistItem[] }>,
    private store: Store
  ) {}

  cartItems$: Observable<cartItem[]>;
  title = 'angular-redux-test';
  loggedIn$: Observable<boolean>;
  loading: boolean;
  serchText: string;
  ngOnInit(): void {
    this.cartItems$ = this.cartStore.select((state) => state.cart.items);
    this.loggedIn$ = this.authStore.select((state) => state.auth.isLoggedIn);
    let loading$ = this.loadingStore.pipe(select(selectLoadingState));
    loading$.subscribe((state) => {
      this.loading = state.isLoading;
    });
  }

  logout() {
    this.store.dispatch(Logout());
    location.reload();
  }

  search() {
    let filter: filter = {
      Brand: '',
      Category: '',
      PageSize: 10,
      PageNumer: 0,
      SearchText: this.serchText,
      SortPrice: '',
    };
    this.store.dispatch(InvokeProductsSearch({ filter: filter }));
  }
}
