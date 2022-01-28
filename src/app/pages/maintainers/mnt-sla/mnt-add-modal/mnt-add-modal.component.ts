import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SlaMaintainer } from 'src/app/core/model/maintainers';
import { SlaDataSource } from 'src/app/core/tables/sla.datasource';
import { SlaService } from 'src/app/core/_services/sla.service';
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

  mntG: SlaMaintainer;
  formGroup: FormGroup;
  label: string;
  unit: number;
  selection: number;

  dataSource: SlaDataSource;
  pager: SlaDataSource;
  _value: string;
  selectSource: any;
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
    this.dataSource = new SlaDataSource(this.mntService);      
    this.label = this.data.value;
    this.loadProperty();
    this.loadForm();
    
  }
  
  loadForm() {
    this.formGroup = this.fb.group({
      description: ['',[Validators.required,Validators.pattern(REGEX.regex_general)]],
      value: ['',[Validators.required,Validators.pattern(REGEX.regex_numeric_special)]],
      unit: ['', Validators.required]
    });
  }

  loadProperty() { 
    const idParameterTable: number = 2;  
    console.log("loadProperty")
    this.pager = new SlaDataSource(this.mntService);
    this.pager.getParameter(idParameterTable)
    .subscribe({
      next: (data) => {
        console.log(data)
          this.selectSource = data;            
      },
      error: () => {}
    });   
  }
  save() {
    console.log('create item');
    const opc = this.prepareProperty();
    if(!opc) return;
    this.dataSource.CreateMaintainer(this.mntG)
    .subscribe({
      next: (data) => {this.closeModal();},
      error: () => {}
    });
    
  }

  private prepareProperty(){
    this.formGroup.markAsDirty();
    if(!this.formGroup.valid) return false;
    const formData = this.formGroup.value;    
    this._value = this.selection == 3? 0 : formData.value;
    this.mntG = {
      id: 0,
      idService: this.data.id,
      type: 0,
      description: formData.description,
      value: this._value,
      idUnitySla: this.selection,
      logicalDelete: 0
    };
    console.log('test->',this.mntG)
    return true;
  }

  verification(){
    if(this.selection == 3) {
      this.switcher = false;    
    }else{
      this.switcher = true;
    }    
  }

  get formControls() {
    return this.formGroup.controls;
  }

  closeModal() {
    this.dialogRef.close();
  }
}