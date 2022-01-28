import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RelationsDataSource } from 'src/app/core/tables/relations.datasource';
import { RelationsService } from 'src/app/core/_services/relations.service';
import { MaterialModalConfig } from 'src/app/shared/modals/config/material.modal.config.impl';
import { ModalConfiguration } from 'src/app/shared/modals/config/modal.config';

import { MntAddModalComponent } from '../mnt-relations/mnt-add-modal/mnt-add-modal.component';
import { MntEditModalComponent } from '../mnt-relations/mnt-edit-modal/mnt-edit-modal.component';

interface _epmRelations {
  _region: number;
  _country: number;
  _entity: number;
  _bussiness: number;
}

@Component({
  selector: 'app-mnt-relations',
  templateUrl: './mnt-relations.component.html',
  styleUrls: ['./mnt-relations.component.scss']
})


export class MntRelationsComponent implements OnInit {

  formGroup: FormGroup;
  item: _epmRelations;

  relation: RelationsDataSource;  
  regionSource: any;  
  subregionSource: any;
  countrySource: any;
  entitySource: any;
  bussinessSource: any;

  constructor(
    private mntService: RelationsService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.item = {} as _epmRelations;
    this.loadForm();
    this.load();
  }
  loadForm() {
    this.formGroup = this.fb.group({
      region: [ ],
      subregion: [{ value: '', disabled: true }],
      country: [{ value: '', disabled: true }],
      entity: [{ value: '', disabled: true }],
      bussiness_unit: [{ value: '', disabled: true }]
    });
  }

  load(){
    this.relation = new RelationsDataSource(this.mntService);
    this.relation.loadHeaders()
    .subscribe({
      next: (data) => {
        //console.log('RGF',data)
        this.regionSource = data;          
      },
      error: () => {
        this.regionSource = null;
      }
    });    
  }

  countryFilter(){  
    this.clean();
    this.disabled();    
    if(this.customChecker(this.item._region)) {
      this.clean();
      this.disabled();
    }else{
      this.item._entity=null;
      this.item._bussiness=null;      
      this.entitySource = null;
      this.bussinessSource = null;
      if(this.item._region != -2){
        this.formGroup.get('country').enable();
        this.relation = new RelationsDataSource(this.mntService);
        this.relation.loadFilters(2,this.item._region)
        .subscribe({
          next: (data) => {
            //console.log('CTRY',data)
            this.countrySource = data;          
          },
          error: () => {
            this.countrySource = null;
          }
        });   
      }
    }
  }

  entityFilter(){   
    if(this.customChecker(this.item._country))  {
      this.disabled();
      this.clean();
    }else{
      this.item._bussiness=null;
      this.bussinessSource = null;
      if(this.item._country != -3){     
        this.formGroup.get('entity').enable();
        this.relation = new RelationsDataSource(this.mntService);        
        this.relation.loadFilters(3,this.item._country)
        .subscribe({
          next: (data) => {
            //console.log('ETTY',data)
            this.entitySource = data;          
          },
          error: () => {
            this.entitySource = null;
          }
        });   
      }
    }
  }

  bussinessFilter(){    
    if(this.customChecker(this.item._entity)) {
      this.disabled();
      this.clean();
    }else{
      if(this.item._entity != -4){      
        this.formGroup.get('bussiness_unit').enable();
        this.relation = new RelationsDataSource(this.mntService);
        this.relation.loadFilters(4,this.item._entity)
        .subscribe({
          next: (data) => {
            //console.log('BNS',data)
            this.bussinessSource = data;          
          },
          error: () => {
            this.bussinessSource = null;
          }
        });   
      }
    }
  }

  bussinessClick(){    
    if(this.customChecker(this.item._bussiness)) {
      this.disabled();
    }else{
      if(this.item._bussiness != -5){            
        //console.log('cambio bussiness click')
      }
    }
  }
  

  create(type: number, typeParent:number, parent: number, description: string ) {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    let Data = {         
        type: type,
        typeParent: typeParent,
        parent: parent,
        description: description
      }
    const materialDialogConf = modalConfig.buildModalConfig('450px', Data);
    const dialogRef = this.dialog.open(MntAddModalComponent, materialDialogConf);
    dialogRef.afterClosed().subscribe(result => {        
      console.log('The dialog was closed');
      this.updater(type);
    });  

  }

  edit() {    
     
  }

  
  checkValid(){
    if(this.item._region == null || this.item._country == null
      || this.item._entity == null || this.item._bussiness == null ){
        console.log('some value is empty')
        return false;
    }else{      
        return true;
    }
  }

  customChecker(value: number): boolean{    
    if(value == -99) {
      return true;
    }else{
      return false;
    }
    
  }
  
  disabled(){
    this.formGroup.get('subregion').disable(); 
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

  updater(value: number){
    switch(value){
      case 2:
        this.load();
        break;        
      case 3:
        this.countryFilter();
        break;
      case 4:
        this.entityFilter();
        break;
      case 5:
        this.bussinessFilter();
        break;
      default:
        this.load();
        this.entityFilter();
        this.bussinessFilter();
        break;
    }
  }

}
