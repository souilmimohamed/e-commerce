import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./books/books.module').then((b) => b.BooksModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((p) => p.ProductsModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((c) => c.CartModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'wishlist',
    loadChildren: () =>
      import('./wishlist/wishlist.module').then((w) => w.WishlistModule),
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
