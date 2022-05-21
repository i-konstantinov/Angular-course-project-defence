import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserStore } from 'src/app/user/user.store';
import { ErrorsService } from '../error/error.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    public auth: UserStore,
    private errorsService: ErrorsService,
    private router: Router
    ) { }

  logoutHandler():void {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/about']),
      error: (err) => this.errorsService.showErrors(err.error.message, err.message)
    });
  }
}