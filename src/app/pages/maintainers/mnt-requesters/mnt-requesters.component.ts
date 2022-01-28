import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, } from '@angular/material/table';



import { MntAddModalComponent } from './mnt-add-modal/mnt-add-modal.component';

import { MntDeleteModalComponent } from '../delete-modal/delete-modal/mnt-delete-modal.component';

import { Data, DataMaintainer, DataPvt, RequesterMaintainer } from 'src/app/core/model/maintainers';

import { PAGINATOR_DEFAULTS, SERVICES } from 'src/app/shared/constants';
import { ModalConfiguration } from 'src/app/shared/modals/config/modal.config';
import { MaterialModalConfig } from 'src/app/shared/modals/config/material.modal.config.impl';
import { MatDialog } from '@angular/material/dialog';
import { RelationsService } from 'src/app/core/_services/relations.service';
import { filter, take } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../tickets/vulnerability-management/_common/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-mnt-requesters',
  templateUrl: './mnt-requesters.component.html',
  styleUrls: ['./mnt-requesters.component.scss']
})
export class MntRequestersComponent implements OnInit {
  pageSize = PAGINATOR_DEFAULTS.pageSize;
  pageSizeOptions = PAGINATOR_DEFAULTS.pageSizeOptions;
  buttonfl = PAGINATOR_DEFAULTS.buttonfl;

  dataSource: any;
  selectSource: RequesterMaintainer[];
  //fields: MaintainersDataSource;

  currentPage: number;
  sortedData: Data[];

  serviceList = SERVICES;
  //material table
  displayedColumns = ["id", "name", "requesterCode", "service", "actions"];
  service: string = null;
  values: string = null;
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;


  constructor(

    private rltService: RelationsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.load();
  }



  load() {
    this.rltService.getRequesters().pipe(take(1))
      .subscribe({
        next: (data) => {
          data.map(
            (row) => {
              row.service = this.serviceList.find(r => r.id == row.idService)?.nombre;
            }
          );
          this.dataSource = new MatTableDataSource<RequesterMaintainer>(data);
          this.dataSource.paginator = this.paginator;
        },
        error: () => {
          this.paginator.length = 0;
          this.dataSource.paginator = this.paginator;
        }
      });
  }


  create(element: RequesterMaintainer) {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    let data;
    if (element) {
      data = element;
    } else {
      data = {
        id: 0,
        idServicio: 0,
        state: 0,
      }
    }
    const materialDialogConf = modalConfig.buildModalConfig('450px', data);
    const dialogRef = this.dialog.open(MntAddModalComponent, materialDialogConf);

    dialogRef.afterClosed().subscribe(reload => {
      if (reload) {
        this.load();
        this.table.renderRows();
      }
    });
  }

  delete(req: RequesterMaintainer) {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    const materialDialogConf = modalConfig.buildModalConfig('450px', {
      title: 'Eliminar Requester',
      subTitle: 'Este procedimiento no se podrá deshacer.',
      message: '¿Desea eliminar al requester ' + req.name + '?',
      inputLabel: 'Motivo de Rechazo',
      additionalInput: false
    });
    const dialogRef = this.dialog.open(ConfirmModalComponent, materialDialogConf);

    dialogRef.afterClosed().pipe(filter(motivo => !!motivo)).subscribe(
      (motivo: any) => {
        this.rltService.deleteRequester(req.id);
      });

  }

  clean() {
    this.dataSource = new MatTableDataSource<RequesterMaintainer>([]);
    this.paginator.length = 0;
    this.dataSource.paginator = this.paginator;
  }

  click(value: string) {
    this.values = value;
  }
}
