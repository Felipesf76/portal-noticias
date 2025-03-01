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

export const passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
  const password = formGroup.get('contrasena')?.value;
  const confirmPassword = formGroup.get('repeatContrasena')?.value;
  // Si las contraseñas no coinciden, devuelve un error
  if (password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  // Si coinciden, devuelve null (no hay error)
  return null;
};

export const dateAfterValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const fechaIngresada = new Date(control.value); // Convierte el valor del control a una fecha
  const fechaActual = new Date(); // Obtiene la fecha actual

  // Si la fecha ingresada es posterior a la fecha actual, devuelve un error
  if (fechaIngresada > fechaActual) {
    return { fechaPosterior: true };
  }

  return null;
};

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;

  // Expresión regular para validar la contraseña
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  // Verifica si la contraseña cumple con la expresión regular
  if (!regex.test(value)) {
    return { passwordInvalid: true };
  }

  // Si la contraseña es válida, devuelve null
  return null;
};
