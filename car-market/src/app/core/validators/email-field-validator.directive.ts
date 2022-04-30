import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { emailValidator } from './validator-functions';

@Directive({
  selector: '[appEmailFieldValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailFieldValidatorDirective, multi: true }]
})
export class EmailFieldValidatorDirective {
  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    return emailValidator(control);
  }
}
