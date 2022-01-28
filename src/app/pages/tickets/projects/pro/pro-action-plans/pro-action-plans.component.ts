import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DbTicket } from 'src/app/core/model/db-ticket.model';
import { MaterialModalConfig } from 'src/app/shared/modals/config/material.modal.config.impl';
import { ModalConfiguration } from 'src/app/shared/modals/config/modal.config';
import { TicketStatusJSON } from 'src/app/shared/constants';
import { filter, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/auth';
import { Router } from '@angular/router';
import { ProActionPlansModalComponent } from '../pro-action-plans-modal/pro-action-plans-modal.component';
import { SpsUser } from 'src/app/modules/auth/_models/sps-user.model';

@Component({
  selector: 'app-pro-action-plans',
  templateUrl: './pro-action-plans.component.html',
  styleUrls: ['./pro-action-plans.component.scss']
})
export class ProActionPlansComponent implements OnInit {
  @Input() public ticket: DbTicket;

  @Input() isNewTicket: boolean;
  @Input() toUpdate: boolean;

  @Input() projectName: string;

  public spsUser: SpsUser;
  public userPolicies = [];

  public phasesNumber: number = 0;

  dataSource: MatTableDataSource<any>;

  public ticketStatus = TicketStatusJSON;

  actionPlans = [];

  constructor(
    public router: Router,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    private _ref: ChangeDetectorRef,
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

  public actionPlansColumns: string[] = ['projectName', 'fase', 'etapa', 'fechaLimite', 'estadoSalud', 'actions'];;

  openModalActionPlan() {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();

    const materialDialogConf = modalConfig.buildModalConfig('450px', {
      index: String(this.actionPlans.length + 1).padStart(3, '0'), projectName: this.projectName
    });
    const dialogRef = this.dialog.open(ProActionPlansModalComponent, materialDialogConf);

    dialogRef.afterClosed().pipe(filter(res => !!res)).subscribe(res => {
      if (res) {
        res.projectName = this.projectName;
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
      });
    });

    return assigned;
  }

  // setAdittionalData(idTicket, idTicketParent, idExecutor, projectName) {
  //   this.idTicket = idTicket;
  //   this.idTicketParent = idTicketParent;
  //   this.idExecutor = idExecutor;
  //   this.projectName = projectName;
  // }

  editActionPlan(row, i) {
    console.log('ROW')
    console.log(row)
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    const materialDialogConf = modalConfig.buildModalConfig('550px', {
      isNewTicket: this.isNewTicket,
      toUpdate: this.toUpdate,
      updateRow: row,
      projectName: row.projectName,
      idTicket: row.id,
      idTicketParent: row.idTicket,
      idExecutor: row.idExecutor,
      index: String(this.actionPlans.length + 1).padStart(3, '0')
    });
    const dialogRef = this.dialog.open(ProActionPlansModalComponent, materialDialogConf);

    dialogRef.afterClosed().pipe(filter(res => !!res)).subscribe(res => {
      if (res) {
        res.projectName = this.projectName;
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
    const materialDialogConf = modalConfig.buildModalConfig('450px', {
      isNewTicket: this.isNewTicket,
      updateRow: row,
    });
    const dialogRef = this.dialog.open(ProActionPlansModalComponent, materialDialogConf);

    dialogRef.afterClosed().pipe(filter(res => !!res)).subscribe(res => {
      // comment
    });
  }

  // ticket creado
  setActionPlans(actionPlans) {
    if (actionPlans && actionPlans.length > 0) {
      this.dataSource.data = actionPlans;
    }
  }

  convertActionPlans(actionPlans) {
    let array = [];
    console.log(actionPlans)
    actionPlans.forEach(ap => {
      let data = JSON.parse(ap.data);
      data.id = ap.id
      data.idTicket = ap.idTicket;
      data.idExecutor = ap.idExecutor;
      data.projectName = ap.projectName;
      array.push(data);
    });
    return array;
  }

  udpateProjectName(newProjectName: string) {
    this.dataSource.data = this.dataSource.data.map((el: any) => {
      el.projectName = newProjectName;
      return el;
    });
    this._ref.detectChanges();
  }

  udpatePhasesNumber(phasesNumber: number) {
    this.phasesNumber = phasesNumber;
  }
}
