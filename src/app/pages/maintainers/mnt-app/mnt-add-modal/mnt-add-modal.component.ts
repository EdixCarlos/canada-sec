import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleAppMaintainer, ModuleAppUpdate } from 'src/app/core/model/maintainers';
import { ModuleappDataSource } from 'src/app/core/tables/moduleapp.datasource';
import { RelationsDataSource } from 'src/app/core/tables/relations.datasource';
import { ModuleappService } from 'src/app/core/_services/moduleapp.service';
import { RelationsService } from 'src/app/core/_services/relations.service';
import { ValidatorsService } from 'src/app/core/_services/validators.service';
import { REGEX } from 'src/app/shared/constants';

interface _epmRelations {
  _region: number;
  _country: number;
  _entity: number;
  _bussiness: number;
}

interface _Checks {
  paymentSystem: boolean,
  cia: boolean,
  mobile: boolean,
  other: boolean,
  internetBanking: boolean,
  abm: boolean,
  contactCenter: boolean,
  branches: boolean,
  others: boolean
}

@Component({
  selector: 'app-mnt-add-modal',
  templateUrl: './mnt-add-modal.component.html',
  styleUrls: ['./mnt-add-modal.component.scss']
})

export class MntAddModalComponent implements OnInit {

  formGroup: FormGroup;

  id: number;
  label: string = null;  
  _data: ModuleAppUpdate;
  item: _epmRelations;
  isChecked: boolean = true;

  relation: RelationsDataSource; 
  saver: ModuleappDataSource;
  regionSource: any;  
  subregionSource: any;
  countrySource: any;
  entitySource: any;
  bussinessSource: any;
  checks: _Checks;
  paymentSystem: string = null;
  support: any;
 
  @ViewChild('cia') cia: string; 

  constructor(
    private fb: FormBuilder,
    public validatorService: ValidatorsService,
    private mntService: RelationsService,
    private moduleService: ModuleappService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModuleAppMaintainer>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {    
      this.item = {} as _epmRelations;
      this.checks = {} as _Checks;
      //this.support = {} as DEFAULT_VALUES;
      this.id = this.data.id;
      this.label = this.data.name;
      this.formInitial();      
      this.load();
  }

  formInitial(){
    if(this.data.id == 0){
      this.emptyForm();
    }else{
      this.loadForm();      
    }
  }

  emptyForm(){
    this.formGroup = this.fb.group({
      region: [{ value: '', disabled: false }],
      country: [{ value: '', disabled: true }],
      entity: [{ value: '', disabled: true }],
      bussiness_unit : [{ value: '', disabled: true }],
      epm: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }],
      paymentSystem: [{ value: '', disabled: true }],
      cia: [{ value: '', disabled: true }],
      mobile: [{ value: '', disabled: true }],
      other: [{ value: '', disabled: true }],
      internetBanking: [{ value: '', disabled: true }],
      abm: [{ value: '', disabled: true }],
      contactCenter: [{ value: '', disabled: true }],
      branches: [{ value: '', disabled: true }],
      others: [{ value: '', disabled: true }],
    });
  }

  loadForm() {
    this.formGroup = this.fb.group({
      region: [{ value: '',disabled: false }],
      country: [{ value: '', disabled: true }],
      entity: [{ value: '', disabled: true }],
      bussiness_unit : [{ value: '', disabled: true }],
      epm: [{ value: this.data.epmCode, disabled: true }],
      name: [{ value: this.data.name, disabled: true }],
      paymentSystem: [{ value: '',disabled: true }],
      cia: [{ value: '', disabled: true }],
      mobile: [{ value: '', disabled: true }],
      other: [{ value: '',disabled: true}],
      internetBanking: [{ value: '', disabled: true }],
      abm: [{ value: '', disabled: true }],
      contactCenter: [{ value: '', disabled: true }],
      branches: [{ value: '', disabled: true }],
      others: [{ value: '', disabled: true }],
    });
  }

 
  load(){
    this.relation = new RelationsDataSource(this.mntService);
    this.relation.loadHeaders()
    .subscribe({
      next: (data) => {
        this.regionSource = data;          
      },
      error: () => {
        this.regionSource = null;
      }
    });    
  }

  countryFilter(){  
    this.clean();
    this.item._entity=null;
    this.item._bussiness=null;      
    this.entitySource = null;
    this.bussinessSource = null;    
    this.formGroup.get('country').enable();
    this.relation = new RelationsDataSource(this.mntService);
    this.relation.loadFilters(2,this.item._region)
    .subscribe({
      next: (data) => {
        this.countrySource = data;          
      },
      error: () => {
        this.countrySource = null;
      }
    });
  }

  entityFilter(){   
    this.item._bussiness=null;
    this.bussinessSource = null;   
    this.formGroup.get('entity').enable();
    this.relation = new RelationsDataSource(this.mntService);        
    this.relation.loadFilters(3,this.item._country)
    .subscribe({
      next: (data) => {
        this.entitySource = data;          
      },
      error: () => {
        this.entitySource = null;
      }
    });
  }

  bussinessFilter(){    
    this.formGroup.get('bussiness_unit').enable();
    this.relation = new RelationsDataSource(this.mntService);
    this.relation.loadFilters(4,this.item._entity)
      .subscribe({
        next: (data) => {
          this.bussinessSource = data;          
        },
        error: () => {
          this.bussinessSource = null;
        }
      });       
  }

  verifyActivity(value: number){
    if(value){
      this.formGroup.get('epm').enable();
      this.formGroup.get('name').enable();
      this.formGroup.get('paymentSystem').enable();
      this.formGroup.get('cia').enable();
      this.formGroup.get('mobile').enable();
      this.formGroup.get('other').enable();
      this.formGroup.get('internetBanking').enable();
      this.formGroup.get('abm').enable();
      this.formGroup.get('contactCenter').enable();
      this.formGroup.get('branches').enable();
      this.formGroup.get('others').enable();
    }else{
      console.log('x')
    }
  }

  bussinessClick(){    
    if(this.customChecker(this.item._bussiness)) {
      this.disabled();
    }else{
      if(this.item._bussiness != -5){
      }
    }
  }
  
  optioner(){
    if(this.checkValid(this.id)){      
      this.Prepare();
      if(this.id === 0){
        this.create()
      }else{
        this.edit();
      }
    }else{
      console.log('invalid');
    }
    
  }

  Prepare(){    
    const formData = this.formGroup.value;
    this._data ={
      id: this.id == 0 ? 0 : this.data.id,      
      idBusinessUnit: this.data.idBusinessUnit,
      name: formData.name? formData.name : this.data.name,
      epmCode: formData.epm? formData.epm : this.data.epmCode,
      paymentSystem: this.checks.paymentSystem? this.checks.paymentSystem : false,
      cia: this.checks.cia? this.checks.cia : false,
      mobile: this.checks.mobile? this.checks.mobile : false,
      other: this.checks.other? this.checks.other : false,
      internetBanking: this.checks.internetBanking? this.checks.internetBanking : false,
      abm: this.checks.abm? this.checks.abm : false,
      contactCenter: this.checks.contactCenter? this.checks.contactCenter : false,
      branches: this.checks.branches? this.checks.branches : false,
      others: this.checks.others? this.checks.others : false,
      logicalDelete: 0
    }
  }

  create(){
    this.saver = new ModuleappDataSource(this.moduleService);
    this.saver.CreateMaintainer(this._data)
    .subscribe({
      next: () => { this.closeModal();}
    });        
  }

  edit(){
    this.saver = new ModuleappDataSource(this.moduleService);
    this.saver.updateServiceDataManteiner(this._data)
    .subscribe(
      {
        next: () => { this.closeModal();}
      });
  }

  checkValid(id: number){
    this.formGroup.markAsDirty();
    if(id == 0){
      if( this.item._region == null ||
        this.item._country == null ||
        this.item._entity == null ||
        this.item._bussiness == null) return false
        if(!this.formGroup.valid) return false;     
        return true;
    }
    return true;        
  }

  customChecker(value: number): boolean{    
    if(value == -99) {
      return true;
    }else{
      return false;
    }
    
  }
  
  checkCheckBoxvalue(){          
    this.checks.paymentSystem = this.formGroup.controls['paymentSystem'].value == ""? false: this.formGroup.controls['paymentSystem'].value;
    this.checks.cia = this.formGroup.controls['cia'].value== ""? false: this.formGroup.controls['cia'].value
    this.checks.mobile = this.formGroup.controls['mobile'].value == ""? false: this.formGroup.controls['mobile'].value
    this.checks.other = this.formGroup.controls['other'].value == ""? false: this.formGroup.controls['other'].value
    this.checks.internetBanking = this.formGroup.controls['internetBanking'].value == ""? false: this.formGroup.controls['internetBanking'].value
    this.checks.abm = this.formGroup.controls['abm'].value == ""? false: this.formGroup.controls['abm'].value
    this.checks.contactCenter = this.formGroup.controls['contactCenter'].value == ""? false: this.formGroup.controls['contactCenter'].value
    this.checks.branches = this.formGroup.controls['branches'].value == ""? false: this.formGroup.controls['branches'].value
    this.checks.others = this.formGroup.controls['others'].value == ""? false: this.formGroup.controls['others'].value   
  }

  disabled(){
    this.formGroup.get('country').disable(); 
    this.formGroup.get('entity').disable();
    this.formGroup.get('bussiness_unit').disable();  
  }

  clean(){      
      this.item._country = null;
      this.item._entity = null;
      this.item._bussiness = null;
      this.countrySource = null;
      this.entitySource = null;
      this.bussinessSource = null;
  }

  get formControls() {
    return this.formGroup.controls;
  }
  
  closeModal() {
    this.dialogRef.close();
  }
}