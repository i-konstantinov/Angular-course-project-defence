import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { map } from "rxjs";
import { UserStore } from "src/app/user/user.store";

@Injectable()
export class AuthActivate implements CanActivate {
    hasUser!: boolean;
    constructor(
        private router: Router,
        private userStore: UserStore
        ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
        this.userStore.isLoggedIn$
        .pipe( map(value => this.hasUser = value) )
        .subscribe();
        
        let { authRequired, RedirectTo } = route.data;

        if (authRequired == this.hasUser) { return true }

        return this.router.parseUrl(RedirectTo);
    }
}