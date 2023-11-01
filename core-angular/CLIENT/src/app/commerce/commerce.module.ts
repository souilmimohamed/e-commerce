import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommerceRoutingModule } from './commerce-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { StoreModule } from '@ngrx/store';
import { ProductReducer } from './products/store/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from './products/store/product.effect';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CartItemComponent } from '../shared/components/cart-item/cart-item.component';
import { WishlistReducer } from './wishlist/store/wishlist.reducer';
import { WishlistEffect } from './wishlist/store/wishlist.effect';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent,
    WishlistComponent,
    ProductCardComponent,
    CartItemComponent,
  ],
  imports: [
    CommonModule,
    CommerceRoutingModule,
    StoreModule.forFeature('product', ProductReducer),
    StoreModule.forFeature('wishlist', WishlistReducer),
    EffectsModule.forFeature([ProductEffect, WishlistEffect]),
    FormsModule,
    PaginationModule,
  ],
})
export class CommerceModule {}
