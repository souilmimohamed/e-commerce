import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpResponseModel } from '../models/httpResponseModel';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ErrorParserService } from '../services/error-parser.service';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private bsModalService: BsModalService,
    private errorParser: ErrorParserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const body = event.body as HttpResponseModel<any>;
          if (!body.Success) {
            const errors = this.errorParser.parseError(body.Errors);
            const config = {
              class: 'modal-dialog-centered',
              initialState: {
                errors,
              },
            };
            const modalRef = this.bsModalService.show(
              ErrorModalComponent,
              config
            );
          }
        }
        return event;
      })
    );
  }
}
