import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { priceValidator } from './validator-functions';

@Directive({
  selector: '[appPriceFieldValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PriceFieldValidatorDirective, multi: true }]
})
export class PriceFieldValidatorDirective {
  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    return priceValidator(control);
  }
}
