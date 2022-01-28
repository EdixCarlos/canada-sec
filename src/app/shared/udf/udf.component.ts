import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Udf } from 'src/app/core/model/udf'
import { UdfService } from 'src/app/core/_services/udf.service';
import { Validation, ValidatorType } from './validation.model';

@Component({
  selector: 'app-udf',
  templateUrl: './udf.component.html',
  styleUrls: ['./udf.component.scss']
})
export class UdfComponent implements OnInit, OnDestroy {

  @Input()
  private formName: string;
  @Output()
  getFormGroup = new EventEmitter<FormGroup>();
  
  public formSent: boolean = false;
  public fields: Udf[];

  udfFormGroup: FormGroup = this.fb.group({});

  subs: Subscription;
  $unsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private udfService: UdfService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.listenFormSent();
    this.loadForm();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.$unsubscribe.next(true);
  }

  listenFormSent() {
    this.subs = this.udfService.formSent.pipe(takeUntil(this.$unsubscribe)).subscribe(
      (formSent) => {
        if(formSent) {
          this.formSent = formSent;
          this.getFormGroup.emit(this.udfFormGroup);
        }
      }
    );
  }

  loadForm() {
    let fields = {};
    
    this.udfService.getUdf(this.formName).subscribe(
      (udf: Udf[]) => {
        if (udf) {
          this.fields = udf;
          for (const field of udf) {
            let fieldValidator: Validation = {
              fieldName: field.formControlName,
              validators: []
            }
            let toCompose = [];
            if (field.validators) {
              for (const validator of field.validators) {
                fieldValidator.validators.push(validator);
                toCompose.push(this.createValidatorObject(validator));
              }
            }

            let initValue;
            switch (field.controlType) {
              case "text":
              case "email":
              case "tel":
              case "password":
              case "select":
                initValue = '';
                break;
              case "checkbox":
                initValue = false;
              case "number":
                initValue = 0;
                break;
              default:
                break;
            }

            fields[field.formControlName] = new FormControl(initValue, Validators.compose(toCompose));

            //this.udfFormGroup.addControl(field.formControlName, new FormControl(''));
          }
          this.udfFormGroup = this.fb.group(fields);
          this.cd.detectChanges();
        }
      }
    );
  }

  createValidatorObject(validator: ValidatorType) {
    let validatorObject;
    switch (validator.type) {
      case "required":
        validatorObject = Validators.required;
        break;
      case "maxLength":
        validatorObject = Validators.maxLength(+validator.param);
        break;
      case "minLength":
        validatorObject = Validators.minLength(+validator.param);
        break;
      case "email":
        validatorObject = Validators.email;
        break;
      case "min":
        validatorObject = Validators.min(+validator.param);
        break;
      case "max":
        validatorObject = Validators.max(+validator.param);
        break;
      case "pattern":
        validatorObject = Validators.pattern(validator.param);
        break;
    }
    return validatorObject;
  }

  public createFormGroup(): FormGroup {
    return this.udfFormGroup;
  }

  public setFormName(formName: string) {
    this.formName = formName;
  }

  get formControls() {
    return this.udfFormGroup.controls;
  }

}
