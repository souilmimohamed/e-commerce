import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { IdentityGuard } from '../shared/guards/identity.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'detail/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [IdentityGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [IdentityGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommerceRoutingModule {}
