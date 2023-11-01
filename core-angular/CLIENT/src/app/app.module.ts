import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { EffectsModule } from '@ngrx/effects';
import { IdentityEffect } from './identity/store/identity.effect';
import { appReducer } from './shared/store/app.reducer';
import { IdentityReducer } from './identity/store/identity.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CartEffect } from './commerce/cart/store/cart.effect';
import { CartReducer } from './commerce/cart/store/cart.reducer';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { ErrorModalComponent } from './shared/components/error-modal/error-modal.component';

export function metaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['identity', 'cart'], rehydrate: true })(
    reducer
  );
}
const metaReducers: Array<MetaReducer<any, any>> = [metaReducer];

@NgModule({
  declarations: [AppComponent, ErrorModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    EffectsModule.forRoot([IdentityEffect, CartEffect]),
    StoreModule.forRoot(
      {
        appState: appReducer,
        identity: IdentityReducer,
        cart: CartReducer,
      },
      { metaReducers }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    NgxSpinnerModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [NgxSpinnerModule],
})
export class AppModule {}
