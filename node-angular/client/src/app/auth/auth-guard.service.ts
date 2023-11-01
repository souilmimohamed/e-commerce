import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AuthState } from './store/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  loggedIn?: boolean;
  constructor(
    private router: Router,
    private authStore: Store<{ auth: AuthState }>
  ) {}

  canActivate(): Observable<boolean> {
    return this.authStore
      .select((state) => state.auth.isLoggedIn)
      .pipe(
        map((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.router.navigate(['/products']);
            return false;
          }
          return true;
        })
      );
  }
}
