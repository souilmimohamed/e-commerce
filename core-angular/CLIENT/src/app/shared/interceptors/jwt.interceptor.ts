import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IdentityState } from 'src/app/identity/store/identity.reducer';
import { first, mergeMap } from 'rxjs/operators';
import { VerifyUrl } from './requestUrlVerifier';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private identityStore: Store<{ identity: IdentityState }>) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.identityStore
      .select((state) => state.identity.token)
      .pipe(
        first(),
        mergeMap((token) => {
          const _request =
            !!token && VerifyUrl(request.url)
              ? request.clone({
                  setHeaders: { Authorization: 'Bearer ' + token },
                })
              : request;
          return next.handle(_request);
        })
      );
  }
}
