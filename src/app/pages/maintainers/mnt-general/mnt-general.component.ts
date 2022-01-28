import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, } from '@angular/material/table';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MaintainersDataSource } from 'src/app/core/tables/maintainers.datasource';
import { MaintainersService } from 'src/app/core/_services/maintainers.service';
import { MntAddModalComponent } from './mnt-add-modal/mnt-add-modal.component';
//import { MntDeleteModalComponent } from './mnt-delete-modal/mnt-delete-modal.component';
import { MntDeleteModalComponent } from '../delete-modal/delete-modal/mnt-delete-modal.component';

import { Data, DataMaintainer, DataPvt} from 'src/app/core/model/maintainers';

import { PAGINATOR_DEFAULTS } from 'src/app/shared/constants';
import { ModalConfiguration } from 'src/app/shared/modals/config/modal.config';
import { MaterialModalConfig } from 'src/app/shared/modals/config/material.modal.config.impl';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mnt-general',
  templateUrl: './mnt-general.component.html',
  styleUrls: ['./mnt-general.component.scss']
})
export class MntGeneralComponent implements OnInit{
  pageSize = PAGINATOR_DEFAULTS.pageSize;
  pageSizeOptions = PAGINATOR_DEFAULTS.pageSizeOptions;
  buttonfl= PAGINATOR_DEFAULTS.buttonfl;
  
  
  formGroup: FormGroup; 
  dataSource: any;
  selectSource: DataPvt[];
  fields: MaintainersDataSource;

  currentPage: number;
  sortedData: Data[];

  //material table
  displayedColumns = ["id", "value", "actions"];   
  service: string = null;
  values: string = null;
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;


  constructor(
    private fb: FormBuilder,
    private mntService: MaintainersService,
    public dialog: MatDialog
    ) { }
    
  ngOnInit(): void {
    this.loadForm();      
    this.load();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      field: ['']
    });
  }

  load(){
    this.fields = new MaintainersDataSource(this.mntService);
    this.fields.loadGeneralMaintainers()
    .subscribe(
        {
        next: (data) => {
          this.selectSource = data;      
        },
        error: () => {
          this.selectSource = null;
        }
      });    
  }

  applyFilter() {    
    if(Number(this.service) == -1) {
      this.clean();      
    } else {
      this.fields = new MaintainersDataSource(this.mntService); 
      this.fields.fill(this.service)
      .subscribe({
        next: (data) => {        
          this.dataSource = new MatTableDataSource<DataMaintainer>(data);
          this.dataSource.paginator = this.paginator;
        },
        error: () => {
          this.paginator.length = 0;
          this.dataSource.paginator = this.paginator;
        }
      });
    }
    
  }
    
  create(element: DataMaintainer) {
    if(!this.checkValidate(element)){
      return;
    }
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    let Data;
    if(element){
      Data = element;
    }else{
      Data = {
        id: 0,
        type: this.service,        
        description: this.values,
        value: null,
        idParent: 0,
        typeParent: 0,
      }
    }    
    const materialDialogConf = modalConfig.buildModalConfig('450px', Data);
    const dialogRef = this.dialog.open(MntAddModalComponent, materialDialogConf);

    dialogRef.afterClosed().subscribe(result => {
      this.applyFilter();
      this.table.renderRows();
    });
  }

  delete(element: DataMaintainer) {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    let Data = {
        id: element.id,
        value: element.value,
        source: 1,
    }        
    const materialDialogConf = modalConfig.buildModalConfig('450px', Data);
    const dialogRef = this.dialog.open(MntDeleteModalComponent, materialDialogConf);

    dialogRef.afterClosed().subscribe(result => {
      this.applyFilter();
      this.table.renderRows();
    });
  }

  clean(){
      this.dataSource = new MatTableDataSource<DataMaintainer>([]);
      this.paginator.length = 0;
      this.dataSource.paginator = this.paginator;      
  }

  checkValidate(element: DataMaintainer){
    if(this.service == null || Number(this.service) == -1 ) {
      return false; 
    }
    return true;
  }

  click(value: string){
    this.values = value;
  }
}
