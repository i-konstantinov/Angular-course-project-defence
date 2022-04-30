import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { yearValidator } from './validator-functions';

@Directive({
  selector: '[appYearFiledValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: YearFiledValidatorDirective, multi: true }]
})
export class YearFiledValidatorDirective {
  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    return yearValidator(control);
  }
}
