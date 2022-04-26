import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  loginSubmitHandler(form: NgForm) {
    if (form.invalid) { return }
    this.userService.login(form.value.email, form.value.password)
    .subscribe({
      error: (err) => {
        console.log(JSON.stringify(err.message));
      },
      next: () => {
        this.router.navigate(['/catalog']);
      }
    })
  }
}
