import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, shareReplay, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { LocalStorage } from "../core/injection-tokens";
import { ICarAd } from "../core/interfaces/car-ad";
import { IUser } from "../core/interfaces/user";
const API_URL = environment.API_URL;

@Injectable({
    providedIn: "root"
})
export class UserStore {
    private subject = new BehaviorSubject<any>(null);

    user$: Observable<IUser> = this.subject.asObservable();

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(
        private http: HttpClient,
        @Inject(LocalStorage) private localStorage: Window['localStorage']
        ) {
        this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedUser => !loggedUser));
        const user = this.localStorage.getItem("<USER>");
        if (user) {
            this.subject.next(JSON.parse(user));
        }
    }

    register(email: string, password: string, phone: string) {
        return this.http.post<IUser>(API_URL + '/user/register', { email, password, phone })
            .pipe(
                tap(userInfo => {
                console.log('server responded: ' + userInfo);
                this.subject.next(userInfo);
                this.localStorage.setItem('<USER>', JSON.stringify(userInfo));
                }),
                shareReplay()
            );
    }

    login(email: string, password: string): Observable<IUser> {
        return this.http.post<IUser>(API_URL + '/user/login', { email, password })
        .pipe(
            tap(userInfo => {
                this.subject.next(userInfo),
                this.localStorage.setItem("<USER>", JSON.stringify(userInfo))
            }),
            shareReplay()
        );
    }

    logout(): Observable<any> {
        return this.http.get(API_URL + '/user/logout')
            .pipe(
                tap(() => {
                    this.subject.next(null);
                    this.localStorage.removeItem("<USER>");
                })
            )
    }

    getAdsByUser() {
        return this.http.get<ICarAd[] | []>(API_URL + '/user/myads')
        .pipe( shareReplay() );
    }

    updateUserInfo() {
        return this.http.get<IUser>(API_URL + '/user/info')
        .pipe(
            tap(userInfo => {
                console.log(userInfo)
                this.localStorage.removeItem("<USER>");
                this.subject.next(userInfo);
                this.localStorage.setItem("<USER>", JSON.stringify(userInfo));
            }),
            shareReplay()
        );
    }
}