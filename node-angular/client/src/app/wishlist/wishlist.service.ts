import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../shared/models';
import { wishlistItem, wishlistRequestModel } from './store/wishlist';
import { Products, Wishlist } from '../products/store/products';
@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  module = 'Identity/Users';
  constructor(private http: HttpClient) {}

  addToWishList(id: number) {
    return this.http.get<ResponseModel<Wishlist>>(
      `${environment.apiEndpoint}/${this.module}/AddWishlistItem?productId=${id}`
    );
  }

  deleteFromWishList(id: number) {
    return this.http.get<ResponseModel<number>>(
      `${environment.apiEndpoint}/${this.module}/DeleteWishlistItem?wishlistItemId=${id}`
    );
  }

  getWishlist() {
    return this.http.get<ResponseModel<Wishlist[]>>(
      `${environment.apiEndpoint}/${this.module}/GetUserWishlist`
    );
  }
}
