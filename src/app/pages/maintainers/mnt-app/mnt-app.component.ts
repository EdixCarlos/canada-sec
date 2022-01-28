import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { ModuleappService } from 'src/app/core/_services/moduleapp.service';
//import { MntDeleteModalComponent } from './mnt-delete-modal/mnt-delete-modal.component';
import { MntDeleteModalComponent } from '../delete-modal/delete-modal/mnt-delete-modal.component';
import { MntAddModalComponent } from './mnt-add-modal/mnt-add-modal.component';

import { ModuleappDataSource } from 'src/app/core/tables/moduleapp.datasource';
import { EPM_HEADERS, PAGINATOR_DEFAULTS } from 'src/app/shared/constants';
import { ModuleAppMaintainer } from 'src/app/core/model/maintainers';
import { ModalConfiguration } from 'src/app/shared/modals/config/modal.config';
import { MaterialModalConfig } from 'src/app/shared/modals/config/material.modal.config.impl';
import { MatDialog } from '@angular/material/dialog';

interface _Service { 
  idType: number,
  idField: number
}
interface _objSender{
  region: number,
  country: number,
  entity: number,
  b_unit: number
}
@Component({
  selector: 'app-mnt-app',
  templateUrl: './mnt-app.component.html',
  styleUrls: ['./mnt-app.component.scss']
})
export class MntAppComponent implements OnInit {
  pageSize = PAGINATOR_DEFAULTS.pageSize;
  pageSizeOptions = PAGINATOR_DEFAULTS.pageSizeOptions;
  buttonfl= PAGINATOR_DEFAULTS.buttonfl;
  formGroup: FormGroup;

  //Default Table
  displayedColumns = ["epm-code", "valor", 
                      /*"payment","cia","mobile",
                      "other","internetBanking","abm",
                      "contactCenter","branches","others",*/"actions"];
  dataSource: any;

  typedSource: any;
  fieldSource: any;

  type: ModuleappDataSource;    
  
  item: _Service;
  sender: _objSender;
  
  pageEvent: PageEvent;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  
  constructor(
    private mntService: ModuleappService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.item = {} as _Service;
    this.sender = {} as _objSender;
    this.load(); 
    this.loadForm();        
  }

  loadForm() {
    this.formGroup = this.fb.group({      
      typedService: [''],
      fieldName: ['']
    });
  }

  load(){
    this.type = new ModuleappDataSource(this.mntService);
    this.type.loadEPMServices(EPM_HEADERS.filter).subscribe(
      {
        next: (data) => {
          this.typedSource = data.filter(app => app.idField == EPM_HEADERS.region || app.idField == EPM_HEADERS.country
            || app.idField == EPM_HEADERS.entity || app.idField == EPM_HEADERS.bs_unit);          
        },
        error: () => {}
      }
    );        
  }    

  fieldFilter(){
    this.type = new ModuleappDataSource(this.mntService);
    const counter = this.item.idType + 1;
    this.type.loadField(counter)
    .subscribe({
      next: (data) => {
        this.fieldSource = data;  
      }
    });
  }

  servicesFilter(){
    this.type = new ModuleappDataSource(this.mntService);
    this.verification();
    this.type.loadChild(this.sender).subscribe(
      {
        next: (data) => {
          this.dataSource = new MatTableDataSource<ModuleAppMaintainer>(data);
          this.dataSource.paginator = this.paginator;   
        },
        error: () => { this.clean(); }
      }
    );
  }

  maker(opc: number,element: ModuleAppMaintainer) {    
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    let Data;
    if(opc == 0 && element == null){
      Data = { 
        id: opc
      }
    }else{
      Data = element;
    }    
    const materialDialogConf = modalConfig.buildModalConfig('450px', Data);
    const dialogRef = this.dialog.open(MntAddModalComponent, materialDialogConf);
    dialogRef.afterClosed().subscribe(result => {        
      console.log('The dialog was closed');
      if(element != null && opc != 0){
        this.servicesFilter();
      }
    });
  }
    
  delete(element: ModuleAppMaintainer) {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    let Data = { 
        id: element.id,
        value: element.name,
        source: 4
      }    
    const materialDialogConf = modalConfig.buildModalConfig('450px', Data);
    const dialogRef = this.dialog.open(MntDeleteModalComponent, materialDialogConf);
    dialogRef.afterClosed().subscribe(result => {        
      console.log('The dialog was closed');
      this.servicesFilter();
    });
  }

  clean(){  
      this.dataSource = new MatTableDataSource<ModuleAppMaintainer>([]);
      this.paginator.length = 0;
      this.dataSource.paginator = this.paginator;
  };

  verification(){
    this.sender = {
      region: this.item.idType == 1 ? this.item.idField : 0,
      country: this.item.idType == 2 ? this.item.idField : 0,
      entity: this.item.idType == 3 ? this.item.idField : 0,
      b_unit: this.item.idType == 4 ? this.item.idField : 0
    }
  }

}
