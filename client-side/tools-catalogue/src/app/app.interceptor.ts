import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class appInterceptor implements HttpInterceptor {
    TOKEN_HEADER_KEY = 'X-Authorization';

    token: string | null = localStorage.getItem('token')
    // constructor(private token: TokenStorageService)

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.token) {
            return next.handle(req.clone({ setHeaders: { TOKEN_HEADER_KEY: this.token } }))
        } else {
            return next.handle(req.clone())
        }
    }


}

export const appInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: appInterceptor,
    multi: true,
}
