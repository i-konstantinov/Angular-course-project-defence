import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, Subscription, takeUntil } from "rxjs";

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) { return null };
    if (
        !control.value.includes('@') ||
        (control.value.includes('@') && control.value.split('@')[0].length < 6) ||
        (!control.value.includes('@gmail.')) ||
        (!control.value.endsWith('.bg') && !control.value.endsWith('.com'))
    ) {
        return {
            validator: [
                "Email address must have at least 6 symbols, after that the symbol \"@\" is followed",
                "The valid domain name is only \"gmail\" again followed by \".\"",
                "Top level domain can be \"bg\" or \"com\""
            ]
        }
    }
    return null;
}

export function passwordsComparer(
    getTargetControl: () => AbstractControl | null,
    killSubscriptions: Observable<any>
    ) {
    let subscription: Subscription | null = null;
    return function (control: AbstractControl) {
        if (subscription) {
            subscription.unsubscribe();
            subscription = null;
        } 
        let target = getTargetControl();
        if (!target) { return null; }
        
        subscription = target.valueChanges
        .pipe( takeUntil(killSubscriptions) )
        .subscribe({
            next: () => { control.updateValueAndValidity(); },
            complete: () => { subscription = null; }
        });

        return target?.value === control?.value ? null : { noMatch: true }
    }
}

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) { return null };
    if (!control.value.startsWith('+359') && !control.value.startsWith('0')) {
        return { validator: ['Enter a valid phone number'] }
    }
    return null;
}

export function yearValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) { return null };
    if (control.value > 2022 || control.value < 1949) {
        return { validator: ['Enter a year between 1950 and 2022'] }
    }
    return null;
}

export function priceValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) { return null };
    const value = control.value;
    if (typeof value != 'number') {
        return { validator: ['Price must be a number'] }
    }
    return null;
}