import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
    this.userService.login(form.value.email, form.value.password).subscribe({
      next: (result) => {
        localStorage.setItem('email', result.email)
        localStorage.setItem('authToken', result.accessToken);
        localStorage.setItem('phone', result.phone);
        localStorage.setItem('userId', result._id);
      },
      error: (err) => {
        console.log(JSON.stringify(err.message));
      },
      complete: () => {
        this.router.navigate(['/'])
      }
    })
  }
}
