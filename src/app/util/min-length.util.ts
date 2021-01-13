import { AbstractControl } from '@angular/forms';

/**
 * https://stackoverflow.com/questions/42184800/how-to-validate-formarray-length-in-angular2
 */
export const minLengthArray = (min: number) => {
  return (c: AbstractControl): { [key: string]: any } => {
    if (c.value.length >= min) return null;

    return { minLengthArray: { valid: false } };
  };
};
