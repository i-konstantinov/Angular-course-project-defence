import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalStorage } from "./injection-tokens";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(@Inject(LocalStorage) private localStorage: Window['localStorage']) {}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const loggedUser = this.localStorage.getItem("<USER>");

        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            const cloned = req.clone({
                headers: req.headers.set("X-Authorization",
                    user.accessToken)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}