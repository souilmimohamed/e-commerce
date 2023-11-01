import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectWishlist } from './store/wishlist.selector';
import {
  InvokeRemoveFromWishlitAPI,
  InvokeWishlistAPI,
} from './store/wishlist.action';
import { WishlistItem } from '../models/wishlist';
import { cartItem } from '../models/cart';
import { AddToCart } from '../cart/store/cart.action';
import { WishlistState } from './store/wishlist.reducer';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlist$ = this.store.select((state) => state.wishlist.items);
  constructor(private store: Store<{ wishlist: WishlistState }>) {}

  ngOnInit(): void {
    this.store.dispatch(InvokeWishlistAPI());
  }
  addToCart(item: WishlistItem) {
    const _item: cartItem = {
      brand: item.BrandName,
      category: item.Categoryname,
      name: item.Name,
      photoUrl: item.PhotoUrl,
      price: item.Price,
      productId: item.Id,
      quantity: 1,
    };
    this.store.dispatch(AddToCart({ item: _item }));
  }

  removeFromWishlist(id: number) {
    this.store.dispatch(InvokeRemoveFromWishlitAPI({ id }));
  }
}
