import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmailFieldValidatorDirective } from '../core/validators/email-field-validator.directive';
import { PhoneFieldValidatorDirective } from '../core/validators/phone-field-validator.directive';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    EmailFieldValidatorDirective,
    PhoneFieldValidatorDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class UserModule { }
