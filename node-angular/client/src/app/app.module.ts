import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './shared/store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './shared/components/cart-item/cart-item.component';
import { CartReducer } from './cart/store/cart.reducer';
import { CartEffect } from './cart/store/cart.effect';
import { FormsModule } from '@angular/forms';
import { MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AuthComponent } from './auth/auth.component';
import { AuthReducer } from './auth/store/auth.reducer';
import { AuthEffect } from './auth/store/auth.effect';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { loadingReducer } from './shared/loaderStore/loader.reducer';
import { ErrorModalComponent } from './shared/components/error-modal/error-modal.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './shared/interceptor.service';
import { WishlistReducer } from './wishlist/store/wishlist.reducer';
import { WishlistEffect } from './wishlist/store/wishlist.effect';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export function metaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['cart', 'auth'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [metaReducer];
@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    CartItemComponent,
    AuthComponent,
    ErrorModalComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EffectsModule.forRoot([CartEffect, AuthEffect, WishlistEffect]),
    StoreModule.forRoot(
      {
        appState: appReducer,
        cart: CartReducer,
        auth: AuthReducer,
        loading: loadingReducer,
        wishlist: WishlistReducer,
      },
      { metaReducers }
    ),
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#000000',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
    }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
