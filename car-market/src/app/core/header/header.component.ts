import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) { 
    // this.userService.getProfileInfo().subscribe({
    //   next: (user) => this.userService.currentUser = user,
    //   error: (err) => {
    //     this.userService.currentUser = undefined
    //     throw err;
    //   }
    // });
  }

  get loggedUser(): boolean {
    return this.userService.loggedUser;
  }
  get user(): IUser | undefined {
    return this.userService.currentUser;
  }

  logoutHandler():void {
    this.userService.logout();
    // this.userService.logout().subscribe(() => {
    //   this.userService.currentUser = undefined
    // });
    this.router.navigate(['/']);
  }
}