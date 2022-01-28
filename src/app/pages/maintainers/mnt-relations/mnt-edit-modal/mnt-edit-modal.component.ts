import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { REGEX } from 'src/app/shared/constants';
import { Router } from '@angular/router';
import { SlaMaintainer, SlaUpdate } from 'src/app/core/model/maintainers';
import { SlaDataSource } from 'src/app/core/tables/sla.datasource';
import { SlaService } from 'src/app/core/_services/sla.service';
import { ValidatorsService } from 'src/app/core/_services/validators.service';


@Component({
  selector: 'app-mnt-edit-modal',
  templateUrl: './mnt-edit-modal.component.html',
  styleUrls: ['./mnt-edit-modal.component.scss']
})
export class MntEditModalComponent implements OnInit {

  mntG: SlaUpdate;
  formGroup: FormGroup;
  label: string;
  unit: string;
  selection: number;

  _value: string;
  selectSource: any;
  dataSource: SlaDataSource;
  pager: SlaDataSource;
  switcher: boolean = true;

  constructor(    
    public dialog: MatDialog,
    private mntService: SlaService,
    private fb: FormBuilder,
    public validatorService: ValidatorsService,    
    public dialogRef: MatDialogRef<SlaMaintainer>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    console.log(this.data.id);
    this.dataSource = new SlaDataSource(this.mntService);     
    this.loadForm();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      region: ['',[Validators.required,Validators.pattern(REGEX.regex_alpha)]],
      subregion: ['',[Validators.required,Validators.pattern(REGEX.regex_alpha)]],
      country: ['',[Validators.required,Validators.pattern(REGEX.regex_alpha)]],
      entity: ['',[Validators.required,Validators.pattern(REGEX.regex_general)]],
      bussiness_unit: ['',[Validators.required,Validators.pattern(REGEX.regex_general)]],
    });
  }

  edit() {    
    const opc = this.prepareProperty();
    if(!opc) return;
    console.log('edit item');
    this.dataSource.updateSlaDataManteiner(this.mntG)
    .subscribe({
      next: () => {this.closeModal();},
      error: () => {}
    });
  }

  private prepareProperty() {
    const formData = this.formGroup.value;
    if (formData.unit == -1) return false;
    if(!this.formGroup.valid) return false;    
    this._value = this.selection == 3? 0 : formData.value;
    this.mntG= {
      id: this.data.id,
      description: formData.description,
      value: this._value,
      idUnitySla: this.selection
    }    
    return true;
  }

  get formControls() {
    return this.formGroup.controls;
  }

  verification(){
    if(this.selection == 3) {
      this.switcher = false;    
    }else{
      this.switcher = true;
    }    
  }

  closeModal() {
    this.dialogRef.close();
  }
}
