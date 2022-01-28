import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DbTicket } from 'src/app/core/model/db-ticket.model';
import { AuditoryActionPlansModalComponent } from '../auditory-action-plans-modal/auditory-action-plans-modal.component';
import { MaterialModalConfig } from 'src/app/shared/modals/config/material.modal.config.impl';
import { ModalConfiguration } from 'src/app/shared/modals/config/modal.config';
import { TicketStatusJSON } from 'src/app/shared/constants';
import { filter, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/auth';
import { Router } from '@angular/router';
import { SpsUser } from 'src/app/modules/auth/_models/sps-user.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-auditory-action-plans',
  templateUrl: './auditory-action-plans.component.html',
  styleUrls: ['./auditory-action-plans.component.scss']
})
export class AuditoryActionPlansComponent implements OnInit {
  @Input() ticket: DbTicket;

  @Input() isNewTicket: boolean;
  @Input() toUpdate: boolean;

  public spsUser: SpsUser;
  public userPolicies = [];
  
  dataSource: any;

  public ticketStatus = TicketStatusJSON;

  actionPlans = [];

  constructor(
    public router: Router,
    private authService: AuthenticationService,
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.checkObservable();
  }

  checkObservable() {
    this.authService.user.pipe(take(1)).subscribe(
      (user) => {
        this.spsUser = { ...user };
        this.userPolicies = user.policies;
      }
    );
  }

  public actionPlansColumns: string[] = [
    "id",
    // "accountable",
    // "assigned",
    "updater",
    "closeDate",
    "status",
    "progress",
    "actions",
  ];

  openModalActionPlan() {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();

    const materialDialogConf = modalConfig.buildModalConfig('450px', {
      index: String(this.actionPlans.length + 1).padStart(3, '0'),
    });
    const dialogRef = this.dialog.open(AuditoryActionPlansModalComponent, materialDialogConf);

    dialogRef.afterClosed().pipe(filter(res => !!res)).subscribe(res => {
      if(res) {
        this.actionPlans.push(res);
        this.dataSource.data = this.actionPlans;
      }
    });
  }

  getActionPlans() {
    const assigned = [];

    this.actionPlans.forEach(e => {
      assigned.push({ 
        id: null,
        idTicket: null,
        data: JSON.stringify(e),
        idExecutor: e.updater,
        userCode: null,
        userName: null,
      });
    });

    return assigned;
  }

  editActionPlan(row, i) {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    const materialDialogConf = modalConfig.buildModalConfig(this.isNewTicket ? '450px' : '900px', {
      isNewTicket: this.isNewTicket,
      toUpdate: this.toUpdate,
      idStatus: this.ticket.idStatus,
      updateRow: row,
    });
    const dialogRef = this.dialog.open(AuditoryActionPlansModalComponent, materialDialogConf);

    dialogRef.afterClosed().pipe(filter(res => !!res)).subscribe(res => {
      if (res) {
        this.actionPlans[i] = res;
        this.dataSource.data = this.actionPlans;
      }
    });
  }

  deleteActionPlan(i) {
    this.actionPlans.splice(i, 1);
    this.dataSource.data = this.actionPlans;
  }

  detailActionPlan(row) {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    const materialDialogConf = modalConfig.buildModalConfig(this.isNewTicket ? '450px' : '900px', {
      toUpdate: this.toUpdate,
      isNewTicket: this.isNewTicket,
      idStatus: this.ticket.idStatus,
      updateRow: row,
    });
    const dialogRef = this.dialog.open(AuditoryActionPlansModalComponent, materialDialogConf);

    dialogRef.afterClosed().pipe(filter(res => !!res)).subscribe(res => {
      // comment
    });
  }

  // ticket creado
  setActionPlans(actionPlans)  {
    if(actionPlans && actionPlans.length > 0) {
      this.dataSource.data = actionPlans;
    }
  }
}
