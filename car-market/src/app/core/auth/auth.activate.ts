import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { UserService } from "src/app/user/user.service";

@Injectable()
export class AuthActivate implements CanActivate {
    constructor(private router: Router, private userService: UserService) { }
    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {

        let { authRequired, RedirectTo } = route.data;

        if (authRequired === this.userService.loggedUser) { return true }

        return this.router.parseUrl(RedirectTo);
    }
}