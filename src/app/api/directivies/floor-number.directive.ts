import { Directive, HostListener } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appFloorNumber]',
  providers: [{ provide: NG_VALIDATORS, useExisting: FloorNumberDirective, multi: true }]
})
export class FloorNumberDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    const valid = /^[1-7]?$/.test(value);
    return valid ? null : { 'invalidFloorNumber': true };
  }
  
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!/^[1-7]?$/.test(input.value)) {
      input.value = '';
    }
  }
}