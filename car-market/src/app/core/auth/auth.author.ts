import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { map } from "rxjs";
import { UserStore } from "src/app/user/user.store";

@Injectable()
export class AuthAuthor implements CanActivate {
    isAuthor!: boolean;
    constructor(private router: Router, private userStore: UserStore) { }
    
    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
        this.userStore.user$
        .pipe(
            map(data => data.carAds) 
        ).subscribe(
            ads => this.isAuthor = ads.includes(route.params["id"])
        );

        let { authAuthorRequired, RedirectTo } = route.data;
        
        if (authAuthorRequired && this.isAuthor) { return true }

        return this.router.parseUrl(RedirectTo);
    }
}
