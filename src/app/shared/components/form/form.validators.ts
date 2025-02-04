import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    let isValid = false;
    if (!value) {
      isValid = true;
    }
    return isValid ? null : { isEmpty: { message: 'El campo es requerido' } };
  };
}

export function minimunLenghtValidator(minimunLenght: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value
    const isValid = value.length >= minimunLenght
    return isValid ? null : { minimunLenght: { message: "El campo debe tener al menos " + minimunLenght + " caracteres" } }
  }
}
