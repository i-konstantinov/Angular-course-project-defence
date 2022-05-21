import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorsService } from 'src/app/core/error/error.service';
import { UserStore } from '../user.store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private errorsService: ErrorsService,
    private userStore: UserStore,
    private router: Router
  ) { }
  
  registerSubmitHandler(form: NgForm): void {
    if (form.invalid) { return }
    this.userStore.register(form.value.email, form.value.password, form.value.phone).subscribe({
      next: () => this.router.navigate(['/catalog']),
      error: (err) => this.errorsService.showErrors(err.message, err.error.message)
    })
  }
}
