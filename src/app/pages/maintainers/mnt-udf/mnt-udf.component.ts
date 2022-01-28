import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MntEditModalComponent } from './mnt-edit-modal/mnt-edit-modal.component';
import { UdfDataSource } from 'src/app/core/tables/udf.datasource';
import { UdfService } from 'src/app/core/_services/udf.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ServicesCascadeService } from 'src/app/core/_services/services-cascade.service';
import { Service } from 'src/app/core/model/service';
import { take } from 'rxjs/operators';
import { SubService } from 'src/app/core/model/sub-service';
import { RequestType } from 'src/app/core/model/request-type';

@Component({
  selector: 'app-mnt-udf',
  templateUrl: './mnt-udf.component.html',
  styleUrls: ['./mnt-udf.component.scss']
})
export class MntUdfComponent implements OnInit {
  formGroup: FormGroup;
  selectedRequestType;
  services: Service[] = [];
  subServices: SubService[] = [];
  requestTypes: RequestType[] = [];
  //Default Table
  displayedColumns = ["id", "name", "type", "actions"];
  dataSource: UdfDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  selectedService;

  constructor(
    private udfService: UdfService,
    private scService: ServicesCascadeService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.loadServicesList();
    this.loadForm();
  }

  loadServicesList() {
    this.scService.getServices().pipe(take(1)).subscribe(
      (services) => {
        console.log(services)
        this.services = services;
      }
    );
  }

  onChangeService(event) {
    this.scService.getSubServicesByServiceId(event.value.id).pipe(take(1)).subscribe(
      (subServices) => {
        this.subServices = subServices;
        this.selectedService = event.value.id;
      }
    );
  }

  onChangeSubService(event) {
    this.scService.getRequestTypeByServiceId(this.selectedService, event.value.id).pipe(take(1)).subscribe(
      (requestTypes) => {
        if (requestTypes.length === 0) {
          this.fillTable(event.value.formName)
        }
        this.requestTypes = requestTypes;
      }
    );
  }

  onChangeRequestType(event) {
    this.selectedRequestType = event.value;
    this.fillTable(event.value.formName);
  }

  fillTable(formName) {
    this.dataSource = new UdfDataSource(this.udfService);
    this.dataSource.loadUdf(formName);
  }

  loadForm() {
    this.formGroup = this.fb.group({
      serviceName: [''],
      fieldName: ['']
    });
  }

  edit(formName: string) {
    console.log('edit id', formName)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '800px';
    dialogConfig.maxWidth = '600px';
    dialogConfig.maxHeight = window.innerHeight + 'px';

    //this.udfService.getUdf(formName)
    dialogConfig.data = {
      subServiceType: this.selectedRequestType
    }

    const dialogRef = this.dialog.open(MntEditModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }

  create() {
    console.log('create')
    this.edit(undefined);
  }

  delete(id: string) {
    //const modalRef = this.modalService.open(MntDeleteModalComponent);
    // modalRef.componentInstance.id = id;
    // modalRef.result.then(() => this.table.renderRows(), () => { });
  }
}
