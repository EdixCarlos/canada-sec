import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SlaDataSource } from 'src/app/core/tables/sla.datasource';
import { MntDeleteModalComponent } from '../delete-modal/delete-modal/mnt-delete-modal.component';
import { MntAddModalComponent } from './mnt-add-modal/mnt-add-modal.component';
import { MntEditModalComponent } from './mnt-edit-modal/mnt-edit-modal.component';
import { PAGINATOR_DEFAULTS } from 'src/app/shared/constants';
import { ValidatorsService } from 'src/app/core/_services/validators.service';
import { SlaMaintainer } from 'src/app/core/model/maintainers';
import { SlaService } from 'src/app/core/_services/sla.service';
import { ModalConfiguration } from 'src/app/shared/modals/config/modal.config';
import { MaterialModalConfig } from 'src/app/shared/modals/config/material.modal.config.impl';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mnt-sla',
  templateUrl: './mnt-sla.component.html',
  styleUrls: ['./mnt-sla.component.scss']
})
export class MntSlaComponent implements OnInit{

formGroup: FormGroup;
pageSize = PAGINATOR_DEFAULTS.pageSize;
pageSizeOptions = PAGINATOR_DEFAULTS.pageSizeOptions;
buttonfl= PAGINATOR_DEFAULTS.buttonfl;
events: string[] = [];

  dataSource: any;
  selectSource: any;
  fields: SlaDataSource;
  pager: SlaDataSource;
  service: number;
  typeService: string;
  value: number;
  des: string;

  //material table
  displayedColumns = ["id", "description","value","unit", "actions"];

  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;;
  @ViewChild(MatTable) table: MatTable<any>;


  constructor(
    private fb: FormBuilder,
    private mntService: SlaService,    
    private modalService: NgbModal,
    public dialog: MatDialog,
    public validatorService: ValidatorsService,
    
    ) { }

  ngOnInit(): void {
    this.loadForm();      
    this.fields = new SlaDataSource(this.mntService);
    this.fields.loadSlaMaintainers()
    .subscribe({ 
      next: (data) => { this.selectSource = data;} 
    });
    
  }

  
  loadForm() {
    this.formGroup = this.fb.group({
      field: ['']
    });
  }

  applyFilter(service: number) {
      this.pager = new SlaDataSource(this.mntService);
      if(Number(service) == -1) {
        this.clean();      
      } else {
      this.pager.loadData(service)
      .subscribe({
        next: (data) => {
          //console.log(data);
          this.dataSource = new MatTableDataSource<SlaMaintainer>(data);
          this.dataSource.paginator = this.paginator;                         
        }
      });    
    }
  }

  edit(element: SlaMaintainer) {    
      let modalConfig: ModalConfiguration = new MaterialModalConfig();
      const Data = {
        id: element.id,
      value: element.description,
      }
      const materialDialogConf = modalConfig.buildModalConfig('450px', Data);
      const dialogRef = this.dialog.open(MntEditModalComponent, materialDialogConf);
  
      dialogRef.afterClosed().subscribe(result => {        
        console.log('The dialog was closed');
        this.applyFilter(this.service);
      });
    
  }

  create() {   
    if(this.service == null) return; 
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    const Data = {
      id: this.service,
      value: this.typeService
    }
    const materialDialogConf = modalConfig.buildModalConfig('450px', Data);
    const dialogRef = this.dialog.open(MntAddModalComponent, materialDialogConf);

    dialogRef.afterClosed().subscribe(result => {      
      this.applyFilter(this.service);
    });
  }

  delete(element: SlaMaintainer) {    
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    const Data = {
      id: element.id,
      value: element.description,
      source: 3
    }
    const materialDialogConf = modalConfig.buildModalConfig('450px', Data);
    const dialogRef = this.dialog.open(MntDeleteModalComponent, materialDialogConf);

    dialogRef.afterClosed().subscribe(result => {      
      this.applyFilter(this.service);
    });
  }
  
  click(selected: string) {
    this.typeService = selected;
  }

  get formControls() {
    return this.formGroup.controls;
  }

  clean(){
    this.dataSource = new MatTableDataSource<SlaMaintainer>([]);
    this.paginator.length = 0;
    this.dataSource.paginator = this.paginator;      
  }
}
