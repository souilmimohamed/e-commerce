import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Products } from 'src/app/products/store/products';
import { cartItem } from 'src/app/cart/store/cart';
import { addToCart } from 'src/app/cart/store/cart.action';
import { InvokeSaveNewWishlistItemAPI } from 'src/app/wishlist/store/wishlist.action';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  constructor(private store: Store) {}
  @Input()
  product?: Products;
  onAddToCart(product: Products) {
    let item: cartItem = {
      id: '',
      productId: product.Id,
      brand: product.Brand,
      image: product.PhotoUrl,
      name: product.Name,
      price: product.Price,
      quantity: 1,
    };
    this.store.dispatch(addToCart({ item }));
  }
  onAddToWishlist(id: number) {
    this.store.dispatch(InvokeSaveNewWishlistItemAPI({ id: id }));
  }
}
