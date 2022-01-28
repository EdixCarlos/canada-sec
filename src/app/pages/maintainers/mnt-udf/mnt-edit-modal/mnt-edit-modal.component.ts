import { Component, Inject, Input, OnInit, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UdfService } from 'src/app/core/_services/udf.service';
import { UDF_CONTROL_TYPES, UDF_VALIDATION_TYPES } from 'src/app/shared/constants';

const EMPTY_PROPERTY = {
  label: '',
  controlTYpe: ''
}
@Component({
  selector: 'app-mnt-edit-modal',
  templateUrl: './mnt-edit-modal.component.html',
  styleUrls: ['./mnt-edit-modal.component.scss']
})
export class MntEditModalComponent implements OnInit {

  @Input() formName: string;
  udf: any;
  formGroup: FormGroup;
  controlTypes = UDF_CONTROL_TYPES;
  validationTypes = UDF_VALIDATION_TYPES;
  hasOptions = false;
  isRegexValid = true;
  hasParams: boolean[] = [];
  options: FormArray;
  validations: FormArray;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MntEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private udfService: UdfService,
    private ren: Renderer2
  ) {
    let el = document.getElementsByClassName('mat-dialog-container').item(0);
    this.ren.setStyle(el, 'overflow-y', 'scroll', RendererStyleFlags2.Important);
  }

  ngOnInit(): void {
    this.loadProperty();
    console.log(this.data)
  }

  loadProperty() {
    if (!this.formName) {
      this.udf = EMPTY_PROPERTY;
      this.loadForm();
    } else {
      console.log("loadProperty")
      this.udfService.getUdf(this.formName)
        .subscribe(data => {
          console.log(data)
          this.udf = data;
          this.loadForm();
        })
    }
  }

  onChangeControlType(event) {
    this.hasOptions = event.value.options;
    if (this.hasOptions) {
      this.addOption();
    } else {
      this.options.clear();
    }
  }

  addOption() {
    const control = this.fb.group({
      label: ''
    });
    this.options.push(control);
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  onChangeValidationType(event, index) {
    if (this.hasParams[index] !== undefined) {
      this.hasParams[index] = event.value.requiresParam;
    } else {
      this.hasParams.push(event.value.requiresParam)
    }
    this.updateAvailableValidationTypes();
  }

  updateAvailableValidationTypes() {
    this.validationTypes = this.validationTypes.map(
      (item) => {
        let existsRegex = false;
        const index = this.validations.getRawValue().findIndex((valObj) => {
          if (valObj.validationType.validationType === "pattern") {
            existsRegex = true;
          }
          return valObj.validationType.validationType === item.validationType;
        });
        if (!existsRegex) {
          this.isRegexValid = true;
          (<HTMLInputElement>document.getElementById("regexInput")).value = '';
        }
        item.disabled = (index > -1);
        return item;
      }
    );
  }

  controlHasParams(index: number) {
    return this.hasParams[index];
  }

  addValidation() {
    const control = this.fb.group({
      validationType: '',
      params: null
    });
    this.validations.push(control);
  }

  removeValidation(index: number) {
    this.validations.removeAt(index);
    this.updateAvailableValidationTypes();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      subServiceType: this.data.subServiceType,
      label: [this.udf.description],
      controlType: '',
      validations: new FormArray([]),
      options: new FormArray([]),
    });
    this.options = this.formGroup.get('options') as FormArray;
    this.validations = this.formGroup.get('validations') as FormArray;
    this.addValidation();
  }

  edit() {
    console.log('edit item')
    this.dialogRef.close();
  }

  submit() {
    this.prepareProperty();
    if (this.udf.id) {
      this.edit();
    } else {
      this.save();
    }
  }

  save() {
    this.dialogRef.close(this.formGroup.getRawValue());
  }

  private prepareProperty() {
    this.formGroup.controls['controlType'].setValue(this.formGroup.getRawValue().controlType.controlType);
    if (this.formGroup.getRawValue().validations.length > 0) {
      let newVal = this.formGroup.getRawValue().validations.map(
        (val) => {
          val.validationType = val.validationType.validationType;
          return val;
        }
      );
      this.formGroup.controls['validations'].setValue(newVal);
    }
  }

  close() {
    this.dialogRef.close();
  }

  patternValidity(event) {
    try {
      new RegExp(event.target.value);
      this.isRegexValid = true;
    } catch (err) {
      this.isRegexValid = false;
    }
  }

}
