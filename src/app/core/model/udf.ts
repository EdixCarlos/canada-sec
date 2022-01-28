import { ValidatorType } from "src/app/shared/udf/validation.model";

export interface Udf {
    label: string;
    formControlName: string;
    controlType: string;
    validators: ValidatorType[];
}