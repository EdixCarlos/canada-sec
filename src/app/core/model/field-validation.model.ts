import { AbstractControl, FormControl } from "@angular/forms";

export interface FieldValidation {
    formControl: FormControl | AbstractControl
    validationType: string,
    errorMessage: string
}