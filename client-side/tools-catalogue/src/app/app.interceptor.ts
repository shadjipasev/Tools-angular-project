import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

type NewType = HttpInterceptor;

@Injectable()


export class appInterceptor implements NewType {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
    }


}

export const appInterceptorProvider: Provider = {
    provide:  HTTP_INTERCEPTORS,
    useClass: appInterceptor,
    multi: true,
}
