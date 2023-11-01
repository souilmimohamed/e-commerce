import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = '';
    const auth = localStorage.getItem('auth');
    if (auth) {
      const _auth = JSON.parse(auth);
      token = _auth.token;
    }
    if (
      request.url.toLocaleLowerCase().includes('addwishlistitem') ||
      request.url.toLocaleLowerCase().includes('getuserwishlist') ||
      request.url.toLocaleLowerCase().includes('deletewishlistitem')
    ) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    return next.handle(request);
  }
}
