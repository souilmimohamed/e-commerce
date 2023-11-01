import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectWishlist } from './store/wishlist.selector';
import {
  InvokeDeleteFromWishlistAPI,
  InvokeWishlistAPI,
} from './store/wishlist.action';
import { wishlistItem } from './store/wishlist';
import { cartItem } from '../cart/store/cart';
import { addToCart } from '../cart/store/cart.action';
import { Products } from '../products/store/products';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(private store: Store) {}
  wishlist$ = this.store.pipe(select(selectWishlist));

  ngOnInit(): void {
    this.store.dispatch(InvokeWishlistAPI());
  }

  onaddToCart(wishlistitem: Products) {
    let item: cartItem = {
      id: '',
      productId: wishlistitem.Id,
      brand: wishlistitem.Brand,
      image: wishlistitem.PhotoUrl,
      name: wishlistitem.Name,
      price: wishlistitem.Price,
      quantity: 1,
    };
    this.store.dispatch(addToCart({ item }));
  }
  onDeleteFromWishlist(id: number) {
    this.store.dispatch(InvokeDeleteFromWishlistAPI({ id }));
  }
}
