import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ServiceMaintainer, ServiceUpdate } from 'src/app/core/model/maintainers';
import { ServicesDataSource } from 'src/app/core/tables/services.datasource';
import { ServicesService } from 'src/app/core/_services/services.service';
import { ValidatorsService } from 'src/app/core/_services/validators.service';
import { REGEX } from 'src/app/shared/constants';


@Component({
  selector: 'app-mnt-add-modal',
  templateUrl: './mnt-add-modal.component.html',
  styleUrls: ['./mnt-add-modal.component.scss']
})
export class MntAddModalComponent implements OnInit {


  formGroup: FormGroup;  
  newItem: ServiceMaintainer;
  mntG: ServiceUpdate;

  label: string = null;
  dataTarget: ServicesDataSource;

  constructor(
    private mntService: ServicesService,
    private fb: FormBuilder,
    public validatorService: ValidatorsService,    
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ServiceMaintainer>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {   
    this.label = this.data.value;             
    this.loadForm();
  }
  
  loadForm() {
    this.formGroup = this.fb.group({
      add: ['',[Validators.required,Validators.pattern(REGEX.regex_general)]]
    });
  }

  optioner(){
    if(this.checkValid()){
      if(this.data.parent == 0){
        this.prepareUpdate();
        this.edit();
      }else{
        this.prepareCreate();
        this.save();
      }
    }
    
  }

  save() {          
      this.dataTarget = new ServicesDataSource(this.mntService);  
      this.dataTarget.CreateMaintainer(this.newItem)
      .subscribe({
        next: () => { this.closeModal(); },
        error: () => {}
      });      
  }

  edit() {  
    this.dataTarget = new ServicesDataSource(this.mntService);  
    this.dataTarget.updateServiceDataManteiner(this.mntG)
      .subscribe({
        next: () => { this.closeModal(); },
        error: () => {}
    });      
  }

  private prepareCreate(){    
    const formData = this.formGroup.value;
    this.newItem = {
      id: 0,
      idService: this.data.idService,
      type: this.data.id,
      description: formData.add,      
      idParent: this.data.value      
    };  
  }

  private prepareUpdate(){
    const formData = this.formGroup.value; 
    this.mntG = {
      id : this.data.id,
      value : formData.add
    };
  }

  checkValid(){
    this.formGroup.markAsDirty();
    if(this.formGroup.valid) return true;
    return false;
  }

  get formControls() {
    return this.formGroup.controls;
  }

  closeModal() {
    this.dialogRef.close();
  }
}