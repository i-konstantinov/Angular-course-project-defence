import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  
  registerSubmitHandler(form: NgForm): void {
    if (form.invalid) { return }
    this.userService.register(form.value.email, form.value.password, form.value.phone).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.log(JSON.stringify(err.message));
      }
    })
  }
}
