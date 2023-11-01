import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsReducer } from './store/products.reducer';
import { ProductsEffect } from './store/products.effect';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    HomeComponent,
    ProductCardComponent,
    AddComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature('myproducts', ProductsReducer),
    EffectsModule.forFeature([ProductsEffect]),
    FormsModule,
    InfiniteScrollModule,
  ],
  exports: [ProductCardComponent],
})
export class ProductsModule {}
