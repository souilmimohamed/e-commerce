import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./commerce/commerce.module').then((m) => m.CommerceModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./identity/identity.module').then((m) => m.IdentityModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
