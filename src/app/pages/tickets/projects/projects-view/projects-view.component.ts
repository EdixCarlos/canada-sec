import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { DbTicket } from 'src/app/core/model/db-ticket.model';
import { MaintainersService } from 'src/app/core/_services/maintainers.service';
import { AuthenticationService } from 'src/app/modules/auth';
import { MinLength, MaxLength, TicketStatusJSON } from 'src/app/shared/constants';

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html'
})
export class ProjectsViewComponent implements OnInit {
  @Output() viewData = new EventEmitter();

  public ticket: DbTicket = new DbTicket();

  public ticketStatus = TicketStatusJSON;

  formGroup: FormGroup;
  public minLength = MinLength;
  public maxLength = MaxLength;

  userPolicies = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private mntService: MaintainersService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.formGroup.disable();
    this.formControls.progress.enable();
  }

  checkObservable(ticket) {
    this.authService.user.pipe(take(1)).subscribe(
      (user) => {
        this.userPolicies = user.policies;
      }
    );
    this.ticket = ticket;
    this.setView(ticket);
  }

  get formControls() {
    return this.formGroup.controls;
  }

  createForm() {
    this.formGroup = this.fb.group({
      nroTicket: [''],
      requestDate: [null],
      attentionDate: [null],
      idStatus: [],
      assigned: [null],
      emailAssigned: [null],
      progress: [0],
    });
  }

  setView(ticket) {
    let data = JSON.parse(ticket.data);
    this.formControls.nroTicket.setValue(ticket.id);
    this.formControls.requestDate.setValue(this.dateFormatFun(ticket.requestDate));
    this.formControls.attentionDate.setValue(this.dateFormatFun(ticket.attentionDate));
    this.formControls.idStatus.setValue(this.ticketStatus[ticket.idStatus].description);
    this.formControls.assigned.setValue(data.nombre_ejecutor);
    this.formControls.emailAssigned.setValue(data.mail_ejecutor);
    this.formControls.progress.setValue(ticket.progress);
  }

  dateFormatFun(date) {
    if(date == null)
      return null;

    let localDate = new Date(date).toLocaleDateString();
    let localTime = new Date(date).toLocaleTimeString();
    
    return `${localDate} ${localTime}`;
  }

  sendViewData() {
    this.viewData.emit(this.formGroup.getRawValue());
  }
}
