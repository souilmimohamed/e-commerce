import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { AuthAPIFailure, AuthAPISuccess, InvokeAuthAPI } from './auth.action';
import { map, switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { AuthService } from '../auth.service';
import { LoadingState } from 'src/app/shared/loaderStore/loader.reducer';
import { SetLoading } from 'src/app/shared/loaderStore/loader.action';

@Injectable()
export class AuthEffect {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private actions$: Actions,
    private authService: AuthService,
    private loadingStore: Store<LoadingState>
  ) {}

  auth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeAuthAPI),
      switchMap((action) => {
        this.setLoadingState(true);
        return this.authService.login(action.credentilas).pipe(
          map((data) => {
            console.log('DATA', data);
            if (data.Success) {
              this.setLoadingState(false);
              return AuthAPISuccess({
                token: data.Body.Token,
                username: data.Body.Username,
              });
            } else {
              this.setLoadingState(false);
              return AuthAPIFailure({ message: data.Errors[0] });
            }
          })
        );
      })
    );
  });

  setLoadingState(state: boolean) {
    this.loadingStore.dispatch(SetLoading({ isLoading: { isLoading: state } }));
  }
}
