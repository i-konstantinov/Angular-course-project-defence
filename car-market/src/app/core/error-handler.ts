
import { ErrorHandler, Provider } from "@angular/core";
import { Router } from "@angular/router";


class MyErrorHandler implements ErrorHandler {
    constructor(private router: Router) { }
    handleError(error: any): void {
        if (error.error) {
            console.log(error['error'].message);
            this.router.navigate(['/error/'], {queryParams: { "msg": error['error'].message }});
        }
    }
}

export const errorHandlerProvider: Provider = {
    provide: ErrorHandler,
    useFactory: (router: Router) => new MyErrorHandler(router),
    deps: [Router]
}