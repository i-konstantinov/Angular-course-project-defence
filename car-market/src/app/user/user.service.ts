import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IUser } from '../core/interfaces/user';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocalStorage } from '../core/injection-tokens';
const API_URL = environment.API_URL;



@Injectable()
export class UserService {
  currentUser: IUser | undefined;

  get loggedUser(): boolean {
    return !!this.currentUser;
  };

  constructor(
    private http: HttpClient,
    @Inject(LocalStorage) private localStorage: Window['localStorage']
  ) {
    try {
      let localStorageUser = this.localStorage.getItem('<USER>') || 'Error';
      this.currentUser = JSON.parse(localStorageUser);
    } catch (err) {
      console.log(err);
      this.currentUser = undefined;
    }
  }

  register(email: string, password: string, phone: string) {
    return this.http.post<IUser>(API_URL + '/user/register',
      { email, password, phone }).pipe(
        tap((user: any) => {
          this.currentUser = user;
          this.localStorage.setItem('<USER>', JSON.stringify(user));
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post(API_URL + '/user/login', { email, password }).pipe(
      tap((user: any) => {
        this.currentUser = user;
        this.localStorage.setItem('<USER>', JSON.stringify(user));
      })
    );
  }

  logout() {
    // this.currentUser = undefined;
    // this.localStorage.clear();
    return this.http.get(API_URL + '/user/logout').pipe(
      tap(() => {
        this.currentUser = undefined;
        this.localStorage.clear();
      })
    );
  }

  getProfileInfo() {
    return this.http.get<IUser>(API_URL + '/user/profile').pipe(
      tap((user: any) => this.currentUser = user));
  }

  updateProfile(phone: string) {
    return this.http.put(API_URL + '/user/profile', phone).pipe(
      tap((user: any) => this.currentUser = user));
  }
}
