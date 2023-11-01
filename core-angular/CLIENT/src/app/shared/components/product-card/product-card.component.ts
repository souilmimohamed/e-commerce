import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddToCart } from 'src/app/commerce/cart/store/cart.action';
import { cartItem } from 'src/app/commerce/models/cart';
import { Product } from 'src/app/commerce/models/product';
import { InvokeAddToWishlistAPI } from 'src/app/commerce/wishlist/store/wishlist.action';
import { IdentityState } from 'src/app/identity/store/identity.reducer';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  loggedIn$ = this.identityState.select((state) => state.identity.isLoggedIn);
  constructor(
    private store: Store,
    private identityState: Store<{ identity: IdentityState }>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addToCart() {
    this.loggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        const item = new cartItem(this.product, 1);
        this.store.dispatch(AddToCart({ item }));
      } else this.router.navigate(['/user/login']);
    });
  }

  adToWichlist() {
    this.loggedIn$.subscribe((loggedIn) => {
      if (loggedIn)
        this.store.dispatch(InvokeAddToWishlistAPI({ id: this.product.Id }));
      else this.router.navigate(['/user/login']);
    });
  }
}
