import { Directive, HostListener } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appDeskNumber]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DeskNumberDirective, multi: true }]
})
export class DeskNumberDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    const valid = /^\d{4}$/.test(value);
    return valid ? null : { 'invalidDeskNumber': true };
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.value.length > 4) {
      input.value = input.value.slice(0, 4);
    }

    while (input.value.length < 4) {
      input.value += '0';
    }

    input.dispatchEvent(new Event('input'));
  }
}
