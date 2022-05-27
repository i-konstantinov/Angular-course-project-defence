import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorsService } from 'src/app/core/error/error.service';
import { IUser } from 'src/app/core/interfaces/user';
import { UserStore } from '../user.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login$: Observable<IUser> | undefined;

  constructor(
    private userStore: UserStore,
    private errorsService: ErrorsService,
    private router: Router
  ) { }

  loginSubmitHandler(form: NgForm) {
    if (form.invalid) { return }
  
    this.userStore.login(form.value.email, form.value.password)
      .subscribe({
        error: (err) => { this.errorsService.showErrors(err.message, err.error.message) },
        complete: () => {
          this.router.navigate(['/catalog']);
        }
      })
  }
}
