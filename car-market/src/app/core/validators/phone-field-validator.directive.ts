import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { phoneValidator } from './validator-functions';

@Directive({
  selector: '[appPhoneFieldValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PhoneFieldValidatorDirective, multi: true }]
})
export class PhoneFieldValidatorDirective {
  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    return phoneValidator(control);
  }
}
