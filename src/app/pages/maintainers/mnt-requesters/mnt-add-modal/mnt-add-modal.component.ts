import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { DataMaintainer, DataPvt, Parameter, RequesterMaintainer } from 'src/app/core/model/maintainers';
import { MaintainersDataSource } from 'src/app/core/tables/maintainers.datasource';

import { MaintainersService } from 'src/app/core/_services/maintainers.service';
import { RelationsService } from 'src/app/core/_services/relations.service';
import { ValidatorsService } from 'src/app/core/_services/validators.service';
import { REGEX, SERVICES } from 'src/app/shared/constants';

const EMPTY_PROPERTY = {
  description: ''
}
@Component({
  selector: 'app-mnt-add-modal',
  templateUrl: './mnt-add-modal.component.html',
  styleUrls: ['./mnt-add-modal.component.scss']
})
export class MntAddModalComponent implements OnInit {

  mntG: Parameter;
  formGroup: FormGroup;
  label: string;
  newItem: RequesterMaintainer;
  _newItem: RequesterMaintainer;
  serviceList = SERVICES;
  isNew = true;

  constructor(
    private rltsService: RelationsService,
    private fb: FormBuilder,
    public validatorService: ValidatorsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RequesterMaintainer>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.label = this.data.value;
    this.loadForm();
    if (this.data.id != 0) {
      this.isNew = false;
      this.formGroup.patchValue(this.data);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      idService: ['', [Validators.required, Validators.pattern(REGEX.regex_numeric_general)]],
      name: ['', [Validators.required, Validators.pattern(REGEX.regex_alpha)]],
      requesterCode: ['', [Validators.required]]
    });
  }


  save() {
    let rm: RequesterMaintainer = this.formGroup.getRawValue();
    if (this.isNew) {
      this.rltsService.createRequester(rm).pipe(take(1))
        .subscribe({
          next: () => { this.closeModal(true); },
          error: () => { }
        });
    } else {
      this.rltsService.updateRequester(rm.id, rm).pipe(take(1))
        .subscribe({
          next: () => { this.closeModal(true); },
          error: () => { }
        });
    }

  }

  get formControls() {
    return this.formGroup.controls;
  }

  closeModal(reload) {
    this.dialogRef.close(reload);
  }
}