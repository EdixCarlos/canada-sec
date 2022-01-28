import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { forkJoin } from "rxjs";
import { take } from "rxjs/operators";
import { ValidatorsService } from "src/app/core/_services/validators.service";
import { AuthenticationService } from "src/app/modules/auth";
import { MaintainersService } from "src/app/core/_services/maintainers.service";
import { MinLength, MaxLength, EvaluationType, TicketStatusJSON } from 'src/app/shared/constants';
import { Router } from "@angular/router";
import { MyTicketsService } from "src/app/core/_services/my-tickets.service";
import { RedirectService } from "src/app/core/_services/redirect.service";

@Component({
  selector: 'app-pro-action-plans-modal',
  templateUrl: './pro-action-plans-modal.component.html',
  styleUrls: ['./pro-action-plans-modal.component.scss']
})
export class ProActionPlansModalComponent implements OnInit {
  public formGroup: FormGroup;

  public minLength = MinLength;
  public maxLength = MaxLength;

  public isNewTicket: boolean = false;
  public toUpdate: boolean = false;
  public idStatus: number;

  public responsableList = [];
  public countries = [];

  public ticketStatus = TicketStatusJSON;
  public ticketStatusArray = [];

  public healthStatusList = [];

  userPolicies = [];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public validatorService: ValidatorsService,
    public dialogRef: MatDialogRef<ProActionPlansModalComponent>,
    private authService: AuthenticationService,
    private mntService: MaintainersService,
    private ticketService: MyTicketsService,
    private redirectService: RedirectService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.getInitialData();
    this.createForm();
    this.checkObservable();
  }

  checkObservable() {
    console.log('DATA')
    console.log(this.data)
    this.isNewTicket = typeof this.data.isNewTicket === 'boolean' ? this.data.isNewTicket : true;
    this.toUpdate = typeof this.data.toUpdate === 'boolean' ? this.data.toUpdate : false;

    this.authService.user.pipe(take(1)).subscribe(
      (user) => {
        this.userPolicies = user.policies;
      }
    );

    if (this.data) {
      if (this.data.updateRow) {
        this.formGroup.patchValue({ ...this.data.updateRow });
      } else {
        this.formGroup.patchValue({ ...this.data });
      }
    }

    console.log(this.formGroup.value);
  }

  get formControls() {
    return this.formGroup.controls;
  }

  createForm() {
    this.formGroup = this.fb.group({
      etapa: ['', Validators.required],
      area: ['', Validators.required],
      pais: ['', Validators.required],
      fechaLimite: ['', Validators.required],
      estadoSalud: ['', Validators.required],
      responsable: [''],
      equipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      comentarios: ['', Validators.required],
      id: [''],
      idTicket: [''],
      idExecutor: [''],
    });
  }

  save() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.getRawValue());
    } else {
      console.log(this.formGroup)
      this.formGroup.markAsTouched();
      this.formGroup.markAsDirty();
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  closeModal2() {
    // this.router.navigate(['my-tickets']);
    this.dialogRef.close();
  }

  update() {
    if (this.formGroup.valid) {
      let data = this.formGroup.getRawValue();
      data.projectName = this.data.projectName;
      this.ticketService.updateSpecialActionPlan(this.data.idTicket, this.data.idTicketParent, this.data.idExecutor, JSON.stringify(data)).pipe(take(1)).subscribe(
        (resp) => {
          console.log(resp);
          let path = `tickets/proyectos/project/view/${this.data.idTicket}/${this.data.idTicketParent}`;
          this.redirectService.redirectTo(path, false, null, 0, true);
        }
      );
      this.dialogRef.close(this.formGroup.getRawValue());
    } else {
      console.log(this.formGroup)
      this.formGroup.markAsTouched();
      this.formGroup.markAsDirty();
    }
  }

  delete() {
    // this.router.navigate(['my-tickets']);
    this.dialogRef.close();
  }

  reasign() {
    // this.router.navigate(['my-tickets']);
    this.dialogRef.close();
  }

  getInitialData() {
    forkJoin([
      this.mntService.getResponsableList(),
      this.mntService.getCountries(),
      this.mntService.getHealthStatusList(),
    ]).subscribe(([res1, res2, res3]) => {
      this.responsableList = res1;
      this.countries = res2;
      this.healthStatusList = res3;
    });

    for (var i in this.ticketStatus) {
      this.ticketStatusArray.push(this.ticketStatus[i]);
    }
  }
}
