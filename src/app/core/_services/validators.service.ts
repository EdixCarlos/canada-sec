import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(
  ) { }

  isControlHasError(control: FormControl | AbstractControl, validationName: string): boolean {
    return control ? (control.hasError(validationName) && (control.dirty || control.touched)) : false;
  }

  validateFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  validateArray(formControl: FormControl | AbstractControl, validationArray: any[]) {
    let errorMessage = '';
    let displayError = false;
    validationArray.forEach((val: any) => {
      if (this.isControlHasError(formControl, val.valType)) {
        displayError = true;
        //const message = this.translateService.instant('VALIDATION.ERROR.' + val.toUpperCase());
        const message = val.message;
        errorMessage += message + ' ';
      }
    });
    return { errorMessage, displayError };
  }
}
