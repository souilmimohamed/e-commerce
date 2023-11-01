import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponseModel } from 'src/app/shared/models/httpResponseModel';
import { WishlistItem } from '../models/wishlist';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WhishlistService {
  constructor(private http: HttpClient) {}
  module = 'Identity/Users';
  getWishlist() {
    return this.http.get<HttpResponseModel<WishlistItem[]>>(
      `${environment.ApiEndpoint}${this.module}/GetUserWishlist`
    );
  }

  addToWishList(id: number) {
    return this.http.get<HttpResponseModel<WishlistItem>>(
      `${environment.ApiEndpoint}${this.module}/AddWishlistItem?productId=${id}`
    );
  }

  removeFromWishlist(id: number) {
    return this.http.get<HttpResponseModel<number>>(
      `${environment.ApiEndpoint}${this.module}/DeleteWishlistItem?wishlistItemId=${id}`
    );
  }
}
