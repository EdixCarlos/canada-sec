import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ValidatorsService } from 'src/app/core/_services/validators.service';
import { FieldValidation } from '../../../core/model/field-validation.model';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss']
})
export class ControlErrorComponent {

  @Input() validationSignal: any;

  constructor(
  ) {
  }
}
