import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MntAddModalComponent } from './mnt-add-modal/mnt-add-modal.component';
import { MntDeleteModalComponent } from '../delete-modal/delete-modal/mnt-delete-modal.component';
import { ServicesDataSource } from 'src/app/core/tables/services.datasource';
import { PAGINATOR_DEFAULTS } from 'src/app/shared/constants';
import { ServiceMaintainer } from 'src/app/core/model/maintainers';
import { ServicesService } from 'src/app/core/_services/services.service';

import { ModalConfiguration } from 'src/app/shared/modals/config/modal.config';
import { MaterialModalConfig } from 'src/app/shared/modals/config/material.modal.config.impl';
import { MatDialog } from '@angular/material/dialog';

interface _Service {
  _service: number;
  _idServiceS: number;  
  _type: number;
  _idServicioT: number;
  _field: number;
  _idServicioF: number;
}

@Component({
  selector: 'app-mnt-services',
  templateUrl: './mnt-services.component.html',
  styleUrls: ['./mnt-services.component.scss']
})
export class MntServicesComponent implements OnInit {
  
  //Default Table
  displayedColumns = ["id", "value", "actions"];
  pageSize = PAGINATOR_DEFAULTS.pageSize;
  pageSizeOptions = PAGINATOR_DEFAULTS.pageSizeOptions;
  buttonfl= PAGINATOR_DEFAULTS.buttonfl;
  formGroup: FormGroup;

  dataSource: any;
  servicesSource: any;
  typedSource: any;
  fieldSource: any;
  services: ServicesDataSource;
  item: _Service;
  
  pageEvent: PageEvent;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private mntService: ServicesService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.item = {} as _Service; 
    this.loadForm();
    this.load();    
  }

  loadForm() {
    this.formGroup = this.fb.group({
      serviceName: [''],
      typedService: [''],
      fieldName: ['']
    });
  }

  load(){
  this.services = new ServicesDataSource(this.mntService);
  this.services.loadGeneralServices()
  .subscribe({
      next: (data) => {
      this.servicesSource = data;
      },
      error: () => {
      this.servicesSource = null;
      }
    });
  }

  clickService(){
    this.clean(true);
  }

  clickTyped(select: number) {
    this.item._idServicioT = select;
  }

  clickField(selected: number) {
    this.item._idServicioF = selected;
  }

  typedFilter(){
    this.clean(true);   
    this.services = new ServicesDataSource(this.mntService); 
    this.services.loadData(this.item._service)
    .subscribe({
      next: (data) => {this.typedSource = data}}
      );    
  }

  Filter(){
    this.item._field = null;
    if (this.item._service == 1){
      this.fieldFilter();
    } else {
      this.servicesFilter();
    }
  }

  fieldFilter(){ 
    this.services = new ServicesDataSource(this.mntService);       
    this.services.loadField(this.item._type,this.item._service)//parent,idservice
    .subscribe({
      next: (data) => {
        this.fieldSource = data;  
      }
    });    
    this.clean(false);
  }

  servicesFilter(){
    if(this.item._field == -1){
      return;
    }
    this.services = new ServicesDataSource(this.mntService);       
    this.services.loadSvr(this.item)
    .subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<ServiceMaintainer>(data);
        this.dataSource.paginator = this.paginator;                
      }
    });

  }

  create(element: ServiceMaintainer) {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    let Data;
    if (element){
      Data = {
        id: element.id,
        idService: 0,
        parent: 0,
        value: element.description
      }
    } else {
      if(this.checkValid()){
        Data = {
          id: this.item._service == 1? 2 : 1,
          idService: this.item._service,         
          parent: this.item._idServicioT, 
          value: this.item._service == 1? this.item._field : this.item._type
        }  
      }else{
        console.log('invalid')
        return;
      }
      
    }           
    const materialDialogConf = modalConfig.buildModalConfig('450px', Data);
    const dialogRef = this.dialog.open(MntAddModalComponent, materialDialogConf);

    dialogRef.afterClosed().subscribe(result => {
        this.clean(true);
        this.table.renderRows();
    });
  }

  delete(element: ServiceMaintainer) {    
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    let Data = {
        id: element.id,
        value: element.description,
        source: 2
    }        
    const materialDialogConf = modalConfig.buildModalConfig('450px', Data);
    const dialogRef = this.dialog.open(MntDeleteModalComponent, materialDialogConf);

    dialogRef.afterClosed().subscribe(result => {
        this.clean(true);
        this.table.renderRows();
    });
  }

  checkValid(){
    if(this.item._service == null || this.item._idServicioT == null) {      
      return false
    };
    if(this.item._service == 1 && this.item._idServicioF == null){
      return false
    };
    return true
  }

  clean(opc: boolean){
    if(opc){
      this.dataSource = new MatTableDataSource<ServiceMaintainer>([]);
      this.paginator.length = 0;
      this.dataSource.paginator = this.paginator;
      this.item._type = null;
      this.item._field = null;
      this.item._idServicioT = null;
      this.item._idServicioF = null;
      
    }else{
      this.dataSource = new MatTableDataSource<ServiceMaintainer>([]);
      this.paginator.length = 0;
      this.dataSource.paginator = this.paginator;

    }  
  };
}
