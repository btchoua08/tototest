import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmEqualValidator(main: string, confirm: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.get(main) || !control.get(confirm)) {
      return { valuesNotEqual: 'Invalid form control names' };
    } else {
      return control.get(main)!.value !== control.get(confirm)!.value ?
        { valuesNotEqual: {
          main: control.get(main)!.value,
            confirm: control.get(confirm)!.value } } :
        null;
    }
  }
}
