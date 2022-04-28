import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { UserService } from "src/app/user/user.service";

@Injectable()
export class AuthAuthor implements CanActivate {
    constructor(private router: Router, private userService: UserService) { }
    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {

        let { authAuthorRequired, RedirectTo } = route.data;

        if (authAuthorRequired && this.userService.currentUser?.carAds.includes(route.params['id'])) { return true }

        return this.router.parseUrl(RedirectTo);
    }
}