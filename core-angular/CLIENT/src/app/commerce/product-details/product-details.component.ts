import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Store } from '@ngrx/store';
import { AddToCart } from '../cart/store/cart.action';
import { cartItem } from '../models/cart';
import { IdentityState } from 'src/app/identity/store/identity.reducer';
import { InvokeAddToWishlistAPI } from '../wishlist/store/wishlist.action';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product$ = this.activatedRoute.paramMap.pipe(
    switchMap((params) => {
      const id = Number(params.get('id'));
      return this.productService.getProductById(id);
    })
  );
  product: Product;
  loggedIn$ = this.identityState.select((state) => state.identity.isLoggedIn);

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private store: Store,
    private identityState: Store<{ identity: IdentityState }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product$.subscribe((result) => {
      if (result.Success) this.product = result.Body;
    });
  }

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
