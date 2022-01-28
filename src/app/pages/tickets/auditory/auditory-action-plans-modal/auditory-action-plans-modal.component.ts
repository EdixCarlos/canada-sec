import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ValidatorsService } from "src/app/core/_services/validators.service";
import { AuthenticationService } from "src/app/modules/auth";
import { MaintainersService } from "src/app/core/_services/maintainers.service";
import { ExecutorService } from "src/app/core/_services/executor.service";
import { MyTicketsService } from "src/app/core/_services/my-tickets.service";
import { MinLength, MaxLength, TicketType, TicketStatusJSON } from 'src/app/shared/constants';
import { Advisor } from "src/app/core/model/avisor.modal";
import { forkJoin } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-auditory-action-plans-modal',
  templateUrl: './auditory-action-plans-modal.component.html',
  styleUrls: ['./auditory-action-plans-modal.component.scss']
})
export class AuditoryActionPlansModalComponent implements OnInit {
  public formGroup: FormGroup;

  public minLength = MinLength;
  public maxLength = MaxLength;

  public isNewTicket: boolean = false;
  public toUpdate: boolean = false;
  public idStatus: number;

  public responsableList= [];
  public executerList: Advisor[] = [];
  public countries = [];

  public ticketStatus = TicketStatusJSON;
  public ticketType = TicketType[14];
  public ticketStatusArray = [];

  public healthStatusList = [];

  userPolicies = [];

  public reasignFlag: boolean = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public validatorService: ValidatorsService,
    public dialogRef: MatDialogRef<AuditoryActionPlansModalComponent>,
    private authService: AuthenticationService,
    private mntService: MaintainersService,
    private executorService: ExecutorService,
    private ticketService: MyTicketsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.getInitialData();
    this.createForm();
    this.checkObservable();
  }

  checkObservable() {
    const data = this.data;
    this.isNewTicket = typeof data.isNewTicket === 'boolean' ? data.isNewTicket : true;
    this.toUpdate = typeof data.toUpdate === 'boolean' ? data.toUpdate : false;
    this.idStatus = data.idStatus ? data.idStatus : 0;

    this.authService.user.pipe(take(1)).subscribe(
      (user) => {
        this.userPolicies = user.policies;
      }
    );

    if(data) {
      if(data.updateRow) {
        this.formGroup.patchValue({...data.updateRow});
      } else {
        this.formGroup.patchValue({...data});
      }
    }

    console.log(this.formGroup.value);
  }

  get formControls() {
    return this.formGroup.controls;
  }

  createForm() {
    this.formGroup = this.fb.group({
      index: ['', Validators.required],
      id: [null],
      idTicket: [null],
      idExecutor: [null],

      accountable: ['', Validators.required],
      accountableCountry: ['', Validators.required],
      accountableTeam: ['', Validators.required],
      assigned: ['', Validators.required],
      assignedCountry: ['', Validators.required],
      assignedTeam: ['', Validators.required],
      updater: ['', Validators.required],
      updaterName: ['', Validators.required],
      updaterCountry: ['', Validators.required],
      updaterTeam: ['', Validators.required],

      accountableE: [null],
      accountableCountryE: [null],
      accountableTeamE: [null],
      assignedE: [null],
      assignedCountryE: [null],
      assignedTeamE: [null],
      updaterE: [null],
      updaterCountryE: [null],
      updaterTeamE: [null],

      progress: [0, Validators.required],
      idStatus: [0, Validators.required],
      healthStatus: [],
      closeDate: [],
      description: [],
      comment: [],
    });
  }

  save() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.getRawValue());
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  update() {
    if(this.formGroup.valid) {
      const data = this.setSchema();
      this.ticketService.updateSpecialActionPlan(
        this.formControls.id.value, 
        this.formControls.idTicket.value,
        this.formControls.idExecutor.value,
        JSON.stringify(data)
      ).subscribe(res => {
        this.dialogRef.close();
      }, err => {
        this.dialogRef.close();
      });
    }
  }

  closeModal2() {
    this.dialogRef.close();
  }

  reasign() {
    this.reasignFlag = !this.reasignFlag;

    // if(this.reasignFlag) {
    //   this.formControls.accountableE.setValidators(Validators.required);
    //   this.formControls.accountableCountryE.setValidators(Validators.required);
    //   this.formControls.accountableTeamE.setValidators(Validators.required);
    //   this.formControls.assignedE.setValidators(Validators.required);
    //   this.formControls.assignedCountryE.setValidators(Validators.required);
    //   this.formControls.assignedTeamE.setValidators(Validators.required);
    //   this.formControls.updaterE.setValidators(Validators.required);
    //   this.formControls.updaterCountryE.setValidators(Validators.required);
    //   this.formControls.updaterTeamE.setValidators(Validators.required);
    // } else {
    //   this.formControls.accountableE.setErrors(null);
    //   this.formControls.accountableCountryE.setErrors(null);
    //   this.formControls.accountableTeamE.setErrors(null);
    //   this.formControls.assignedE.setErrors(null);
    //   this.formControls.assignedCountryE.setErrors(null);
    //   this.formControls.assignedTeamE.setErrors(null);
    //   this.formControls.updaterE.setErrors(null);
    //   this.formControls.updaterCountryE.setErrors(null);
    //   this.formControls.updaterTeamE.setErrors(null);
    // }
  }

  setSchema() {
    this.formControls.accountable.setValue(
      this.formControls.accountableE.value ? 
        this.formControls.accountableE.value : this.formControls.accountable.value
    );
    this.formControls.accountableCountry.setValue(
      this.formControls.accountableCountryE.value ? 
        this.formControls.accountableCountryE.value : this.formControls.accountableCountry.value
    );
    this.formControls.accountableTeam.setValue(
      this.formControls.accountableTeamE.value ? 
        this.formControls.accountableTeamE.value : this.formControls.accountableTeam.value
    );
    this.formControls.assigned.setValue(
      this.formControls.assignedE.value ? 
        this.formControls.assignedE.value : this.formControls.assigned.value
    );
    this.formControls.assignedCountry.setValue(
      this.formControls.assignedCountryE.value ? 
        this.formControls.assignedCountryE.value : this.formControls.assignedCountry.value
    );
    this.formControls.assignedTeam.setValue(
      this.formControls.assignedTeamE.value ? 
        this.formControls.assignedTeamE.value : this.formControls.assignedTeam.value
    );
    this.formControls.updater.setValue(
      this.formControls.updaterE.value ? 
        this.formControls.updaterE.value : this.formControls.updater.value
    );
    this.formControls.updaterCountry.setValue(
      this.formControls.updaterCountryE.value ? 
        this.formControls.updaterCountryE.value : this.formControls.updaterCountry.value
    );
    this.formControls.updaterTeam.setValue(
      this.formControls.updaterTeamE.value ? 
        this.formControls.updaterTeamE.value : this.formControls.updaterTeam.value
    );

    this.formControls.accountableE.setValue(null);
    this.formControls.accountableCountryE.setValue(null);
    this.formControls.accountableTeamE.setValue(null);
    this.formControls.assignedE.setValue(null);
    this.formControls.assignedCountryE.setValue(null);
    this.formControls.assignedTeamE.setValue(null);
    this.formControls.updaterE.setValue(null);
    this.formControls.updaterCountryE.setValue(null);
    this.formControls.updaterTeamE.setValue(null);
    
    return this.formGroup.getRawValue();
  }

  setUpdaterName() {
    const updater = this.executerList.find(e => e.id == this.formControls.updater.value);
    this.formControls.updaterName.setValue(updater.name);
  }

  getInitialData() {
    forkJoin([
      this.executorService.getAvisors(this.ticketType.idService),
      this.mntService.getCountries(),
      this.mntService.getHealthStatusList(),
    ]).subscribe(([res1, res2, res3]) => {
      this.executerList = res1;
      this.countries = res2;
      this.healthStatusList = res3;
    });

    for(var i in this.ticketStatus) {
      this.ticketStatusArray.push(this.ticketStatus[i]);
    }    
  }
}
