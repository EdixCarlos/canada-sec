import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataMaintainer, DataPvt, Parameter } from 'src/app/core/model/maintainers';
import { MaintainersDataSource } from 'src/app/core/tables/maintainers.datasource';

import { MaintainersService } from 'src/app/core/_services/maintainers.service';
import { ValidatorsService } from 'src/app/core/_services/validators.service';
import { REGEX } from 'src/app/shared/constants';

const EMPTY_PROPERTY = {
  description: ''
}
@Component({
  selector: 'app-mnt-add-modal',
  templateUrl: './mnt-add-modal.component.html',
  styleUrls: ['./mnt-add-modal.component.scss']
})
export class MntAddModalComponent implements OnInit {

  @Input() id: string;
  @Input() value: string;

  mntG: Parameter;
  formGroup: FormGroup;  
  label: string;
  newItem: DataMaintainer;
  _newItem: DataPvt;
  dataTarget: MaintainersDataSource;

  constructor(
    private mntService: MaintainersService,
    private fb: FormBuilder,
    public validatorService: ValidatorsService,
    public dialog: MatDialog,    
    public dialogRef: MatDialogRef<DataMaintainer>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {    
    this.label = this.data.value;
    this.loadForm();
  }
  
  loadForm() {
    this.formGroup = this.fb.group({
      add: ['',[Validators.required,Validators.pattern(REGEX.regex_text)]]
    });
  }

  
  save() {
    this.dataTarget = new MaintainersDataSource(this.mntService);
    this.dataTarget.CreateMaintainer(this.newItem)
    .subscribe({
      next: () => { this.closeModal(); },
      error: () => { }
    });
    
  }

  edit() {     
    this.dataTarget = new MaintainersDataSource(this.mntService);   
    this.dataTarget.updateGeneralDataManteiner(this._newItem)
    .subscribe(
      {
        next: () => { this.closeModal(); },
        error: () => { }
      });    
  }

  private PrepareCreate(){
    const formData = this.formGroup.value;
    this.newItem = {
      id: 0,
      type: this.data.type,
      description: this.data.description,
      idParent: 0,
      value: formData.add,
      typeParent: 0
    };    
  }

  PrepareEdit(){
    const formData = this.formGroup.value;
    this._newItem = {
      id: this.data.id,
      value: formData.add
    };    
  }
  
  optioner(){
    if(this.checkValid()){      
      if(this.data.id === 0){
        this.PrepareCreate();
        this.save()
      }else{
        this.PrepareEdit();
        this.edit();
      }
    }    
  }

  checkValid(){
    this.formGroup.markAsDirty();
    if(!this.formGroup.valid) return false;
    return true;
  }

  get formControls() {
    return this.formGroup.controls;
  }

  closeModal() {
    this.dialogRef.close();
  }
}