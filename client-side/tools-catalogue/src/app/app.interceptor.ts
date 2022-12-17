import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth/auth.service";


@Injectable()
export class appInterceptor implements HttpInterceptor {

    TOKEN_HEADER_KEY = 'X-Authorization';

    constructor(private authService: AuthService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem(this.authService.tokenName)

        if (token) {
            return next.handle(req.clone({
                headers: req.headers.set(this.TOKEN_HEADER_KEY, token)
            }))
        } else {
            return next.handle(req)
        }
    }
    
}

export const appInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: appInterceptor,
    multi: true,
}
