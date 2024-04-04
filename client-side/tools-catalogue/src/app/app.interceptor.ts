import { LoaderService } from './main/services/loader/loader.service';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable()
export class appInterceptor implements HttpInterceptor {
  TOKEN_HEADER_KEY = 'X-Authorization';

  constructor(
    private authService: AuthService,
    private loader: LoaderService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(this.authService.tokenName);
    this.loader.showLoader();
    if (token) {
      return next
        .handle(
          req.clone({
            headers: req.headers.set(this.TOKEN_HEADER_KEY, token),
          })
        )
        .pipe(catchError(this.handleError));
    } else {
      return next.handle(req).pipe(
        finalize(() => {
          this.loader.hideLoader(), catchError(this.handleError);
        })
      );
    }
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
}

export const appInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: appInterceptor,
  multi: true,
};
