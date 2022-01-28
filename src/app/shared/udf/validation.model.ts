export interface ValidatorType {
    type: string,
    param?: string,
    message: string
}

export interface Validation{
    fieldName: string,
    validators: ValidatorType[]
}