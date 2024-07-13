import { GlobalErrorHandler } from './main/services/error-handler/global-error-handler.service';
// import { GlobalErrorHandlerService } from './main/services/errorHandler/global-error-handler.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Inject, Injectable, Provider } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { LoaderService } from './main/services/loader/loader.service';

@Injectable()
export class appInterceptor implements HttpInterceptor {
  TOKEN_HEADER_KEY = 'X-Authorization';

  constructor(
    private authService: AuthService,
    private loader: LoaderService,
    private errorService: GlobalErrorHandler
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loader.showLoader();

    const token = localStorage.getItem(this.authService.tokenName);
    if (token) {
      return next
        .handle(
          req.clone({
            headers: req.headers.set(this.TOKEN_HEADER_KEY, token),
          })
        )
        .pipe(finalize(() => this.loader.hideLoader()));
    } else {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorService.handleError(error)
        ),
        finalize(() => this.loader.hideLoader()) // Call hideLoader on completion or error
      );
    }
  }
}

export const appInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: appInterceptor,
  multi: true,
};
