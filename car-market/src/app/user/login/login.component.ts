import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login$: Observable<IUser> | undefined;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  loginSubmitHandler(form: NgForm) {
    if (form.invalid) { return }
    this.login$ = this.userService.login(form.value.email, form.value.password);
    this.login$
      .subscribe({
        error: (err) => { throw err },
        complete: () => {
          this.router.navigate(['/catalog']);
        }
      })
  }
}
