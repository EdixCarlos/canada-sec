import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/core/_services/validators.service';
import { DbTicket, ObjActionPlan, ObjComment, ObjFile, ObjLocation, TicketData } from "src/app/core/model/db-ticket.model";
import { Location } from "src/app/core/model/location";
import { MinLength, MaxLength, TicketType } from 'src/app/shared/constants';
import { ModalConfiguration } from 'src/app/shared/modals/config/modal.config';
import { RegionModalComponent } from '../../vulnerability-management/_common/modals/region-modal/region-modal.component';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModalConfig } from 'src/app/shared/modals/config/material.modal.config.impl';
import { filter, take } from 'rxjs/operators';
import { AddAppModalComponent } from '../../vulnerability-management/_common/modals/add-app-modal/add-app-modal.component';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { ServicesService } from 'src/app/core/_services/services.service';
import { RequestTypeSelectedService } from 'src/app/core/_services/request-type-selected.service';
import { MyTicketsService } from 'src/app/core/_services/my-tickets.service';
import { AuditoryViewComponent } from '../auditory-view/auditory-view.component';
import { UdfService } from 'src/app/core/_services/udf.service';
import { SpsUser } from 'src/app/modules/auth/_models/sps-user.model';
import { AuthenticationService } from 'src/app/modules/auth';
import { ApplicationService } from 'src/app/core/_services/application.service';
import { MaintainersService } from 'src/app/core/_services/maintainers.service';
import { RedirectService } from 'src/app/core/_services/redirect.service';
import { CommonService } from 'src/app/core/_services/common.service';
import { ActionPlansComponent } from '../../vulnerability-management/_common/action-plans/action-plans/action-plans.component';
import { AuditoryActionPlansComponent } from '../auditory-action-plans/auditory-action-plans.component';
import { ExecutorService } from 'src/app/core/_services/executor.service';

@Component({
  selector: 'app-auditory-create',
  templateUrl: './auditory-create.component.html',
  styleUrls: ['./auditory-create.component.scss']
})
export class AuditoryCreateComponent implements OnInit {
  @ViewChild(AuditoryViewComponent, { static: false })
  public auditoryViewComponent: AuditoryViewComponent;

  @ViewChild(AuditoryActionPlansComponent, { static: false })
  public auditoryActionPlansComponent: AuditoryActionPlansComponent;

  @ViewChild(ActionPlansComponent, { static: false })
  public actionPlansComponent: ActionPlansComponent;

  userPolicies = [];

  // For udf
  public FORM_NAME = "vul-ass";
  private udfForm: FormGroup;
  // For udf
  canBeClosed: boolean;

  public formGroup: FormGroup;

  public epmFound: boolean = false;
  public isNewTicket: boolean = false;
  public toUpdate: boolean = false;

  public minLength = MinLength;
  public maxLength = MaxLength;

  // 
  showRequestTypeInput: boolean = false;
  countriesList: string = "";
  entitiesList: string = "";
  regionDesc: string = "";
  // 

  public spsUser: SpsUser;

  public selectedEntities = [];

  public ticket: DbTicket = new DbTicket();
  public ticketType = TicketType[14];

  public applicationList = [];
  public businessChannelList = [];
  public safetyCategoryList = [];
  public riskLevelList = [];
  public healthStatusList = [];
  public responsableList= [];
  public managerList = [];
  public executorList = [];
  public auditCheckStatusList = [];
  public implementationList = [];

  objFiles: ObjFile[] = [];

  public applicationTypes = new BehaviorSubject<any>([]);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public validatorService: ValidatorsService,
    private udfService: UdfService,
    private ticketService: MyTicketsService,
    private servicesService: ServicesService,
    private requestTypeService: RequestTypeSelectedService,
    private authService: AuthenticationService,
    private mntService: MaintainersService,
    private appService: ApplicationService,
    private redirectService: RedirectService,
    private utils: CommonService,
    private executorService: ExecutorService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getInitialData();
    this.createForm();
    this.getApplicationTypes();
    this.checkObservable();
  }

  get formControls() {
    return this.formGroup.controls;
  }

  get applicationType() {
    return this.formControls.applicationType as FormGroup;
  }

  createForm() {
    this.formGroup = this.fb.group({
      idParent: [null],
      requestedBy: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      id: ['', Validators.required],
      requestArea: [''],
      requestType: [''],
      requestTypeName: [''],
      selectedRegions: ['', Validators.required],
      selectedCountries: ['', Validators.required],
      entity: [''],
      localCiso: [''],
      epmCode: ['', Validators.required],
      applicationName: ['', Validators.required],
      applicationNameOther: [''],
      applicationType: this.fb.group({
        cia: [false],
        mobile: [false],
        payment: [false],
        corebanking: [false],
        ifa: [false],
        other: [false],
        cloudbased: [false],
      }),
      businessUnit: [''],
      businessChannel: [''],
      observationCode: [''],
      observationName: [''],
      description: [''],
      resolutionDate: [''],
      assigned: [''],
      safetyCategory: ['0'],
      expectedResolutionDate: [''],
      manager: [''],
      riskLevel: ['0'],
      actionPlansCount: [''],
      auditCheckStatus: [''],
      safetyStatus: [''],
      implementation: [''],
      additionalComments: [''],
      comments: [''],
      file: [],
      objFiles: []
    });
  }

  public isChild: boolean = false;

  checkObservable() {
    this.setBusinessChannelList();
    this.activatedRoute.url.subscribe((url: UrlSegment[]) => {
      if (url[1].path === 'view') {
        this.isNewTicket = false;
        this.authService.user.pipe(take(1)).subscribe(
          (user) => {
            this.spsUser = { ...user };
            this.userPolicies = user.policies;
          }
        );
        
        if(url.length > 3) {
          this.toUpdate = true;
          this.loadActionPlans(url[2].path, url[3].path);
        } else {
          this.loadData(url[2].path);
        }
      } else {
        if (url[1].path === 'create' && url.length > 2) {
          this.formControls.idParent.setValue(url[2].path);
          this.isChild = true;
        }
        this.isNewTicket = true;
        this.authService.user.pipe(take(1)).subscribe(
          (user) => {
            this.spsUser = { ...user };
            this.formControls.requestedBy.setValue(user.name);
            this.formControls.email.setValue(user.email);
            this.formControls.id.setValue(user.identityName);
            this.formControls.requestArea.setValue(user.area);
            this.userPolicies = user.policies;
          }
        );
        this.formControls.requestTypeName.setValue(this.ticketType.description);
        this.disabledInputs();
      }
    });

    this.requestTypeService.selectedRequestType$.pipe(take(1)).pipe(filter(requestType => !!requestType))
      .subscribe(requestType => {
        this.formControls.requestType.setValue(requestType.id);
        this.formControls.requestTypeName.setValue(requestType.name);
        this.showRequestTypeInput = true;
      });

  }

  disabledInputs() {
    if (this.isNewTicket || this.ticket.idStatus == 104) {
      this.formControls.requestedBy.disable();
      this.formControls.email.disable();
      this.formControls.id.disable();
      this.formControls.requestArea.disable();
    } else {
      this.formControls.requestedBy.disable();
      this.formControls.email.disable();
      this.formControls.id.disable();
      this.formControls.requestArea.disable();
      this.formControls.requestType.disable();
      this.formControls.selectedRegions.disable();
      this.formControls.selectedCountries.disable();
      this.formControls.entity.disable();
      this.formControls.localCiso.disable();
      this.formControls.epmCode.disable();
      this.formControls.applicationName.disable();
      this.formControls.applicationNameOther.disable();
      this.formControls.applicationType.disable();
      this.formControls.businessUnit.disable();
      this.formControls.businessChannel.disable();
      this.formControls.observationCode.disable();
      this.formControls.observationName.disable();
      this.formControls.description.disable();
      this.formControls.resolutionDate.disable();
      this.formControls.assigned.disable();
      this.formControls.safetyCategory.disable();
      this.formControls.expectedResolutionDate.disable();
      this.formControls.manager.disable();
      this.formControls.riskLevel.disable();
      this.formControls.actionPlansCount.disable();
      // this.formControls.auditCheckStatus.disable();
      // this.formControls.safetyStatus.disable();
      this.formControls.actionPlansCount.disable();
    }
  }

  setUdfForm(udfForm: FormGroup) {
    this.udfForm = udfForm;
  }

  loadData(ticketId) {
   this.ticketService.getTicketById(+ticketId).pipe(take(1)).subscribe(
      (ticket) => {
        this.ticket = ticket;
        this.disabledInputs();
        this.canBeClosedCheck();
        this.mapTicketToForm();
        this.auditoryViewComponent.checkObservable(ticket);
      }
    );

    if(this.actionPlansComponent) {
      // actionPlans estandar
      this.ticketService.getTicketsByParentId(ticketId).subscribe(res => {
        let objActionPlans: ObjActionPlan[] = [];
        if (res && res.length > 0) {
          let objActionPlan: ObjActionPlan;
  
          for (let i = 0; i < res.length; i++) {
            objActionPlan = { ...res[i] };
            objActionPlans.push(objActionPlan);
          }
          this.ticket.objActionPlans = objActionPlans;
        }
        this.actionPlansComponent.checkObservable(this.ticket.objActionPlans);
      });
    }
  }


  loadActionPlans(id, idParent) {
    // actionPlans de auditoria
    this.ticketService.getTicketById(+idParent).pipe(take(1)).subscribe(
      (ticket) => {
        this.ticket = ticket;
        this.auditoryViewComponent.checkObservable(ticket);

        if(ticket.actionPlans && ticket.actionPlans.length > 0) {
          this.getRows(ticket, rows => {
            const row = rows.find((e: any) => e.id == id);
            this.auditoryActionPlansComponent.setActionPlans(rows);
            this.auditoryActionPlansComponent.editActionPlan(row, row.index);
          });
        }
      }
    );
  }

  // ticket creado
  getRows(ticket, callBack) {
    const actionPlans = ticket.actionPlans
    let rows = [];
    
    this.executorService.getAvisors(this.ticketType.idService).subscribe(res => {
      actionPlans.map(e => {
        if(e.userCode == this.spsUser.identityName) { 
          let data = JSON.parse(e.data);
          data.id = e.id;
          data.idTicket = e.idTicket;
          data.idExecutor = e.idExecutor;
          data.updaterName = res.find(e => e.id == data.updater).name;
          rows.push(data);
        }
      });
      callBack(rows);
    });
  }

  mapTicketToForm() {
    const ticket: DbTicket = this.ticket;
    let form: any = {};
    let data = JSON.parse(ticket.data).datos;
    let dataJSON = JSON.parse(data);
    form.requestedBy = ticket.requesterName;
    form.email = dataJSON.email;
    form.id = ticket.id;
    form.requestArea = ticket.requesterArea;
    form.requestType = dataJSON.requestType;
    form.selectedRegions = dataJSON.selectedRegions;
    form.selectedCountries = dataJSON.selectedCountries;
    form.entity = dataJSON.entity;
    form.localCiso = dataJSON.localCiso;

    this.objFiles = this.ticket.objFiles;

    if (ticket.objComments.length > 0)
      dataJSON.comments = this.formatComments(ticket.objComments);
    dataJSON.additionalComments = '';

    let location: Location = {
      region: form.selectedRegions,
      countries: form.selectedCountries,
      entities: form.entity,
      localCiso: form.localCiso
    }

    this.setLocationToForm(location);
    this.setApplicationList(location);

    form.requestTypeName = dataJSON.requestTypeName;
    form.epmCode = dataJSON.epmCode;

    if(ticket.actionPlans && ticket.actionPlans.length > 0) {
      this.getRows(ticket, rows => {
        this.auditoryActionPlansComponent.setActionPlans(rows);
      });
    }

    this.formGroup.patchValue({ ...form, ...dataJSON });
  }

  formatComments(objComments: ObjComment[]) {
    let string = '';
    objComments.forEach(
      (obj) => {
        const date = new Date(obj.commentDate);
        string += `${obj.userName} - ${date.toLocaleString()}\n${obj.comment}\n\n`
      }
    );
    return string;
  }

  onSubmit() {
    for (const i in this.formGroup.controls) {
      this.formGroup.controls[i].markAsDirty();
      this.formGroup.controls[i].updateValueAndValidity();
    }
    
    if (this.formGroup.valid) {
      this.udfService.setFormSent(true);
      const ticket = this.setSchema(this.formGroup.getRawValue());
      
      if (this.isNewTicket) {
        this.saveTicket(ticket);
      }
    }
  }

  getViewData(viewData) {
    this.ticket.progress = viewData.progress;
  }

  setSchema(formGroup): DbTicket {
    let ticket = new DbTicket();
    ticket.requesterArea = formGroup.requestArea;
    ticket.requesterName = formGroup.requestedBy;
    ticket.objLocation = formGroup.entity;
    ticket.idTicketType = this.ticketType.id;
    ticket.idService = this.ticketType.idService;
    ticket.idApplication = formGroup.applicationName;
    ticket.userCode = this.spsUser.identityName;
    ticket.userName = this.spsUser.user;
    ticket.requesterCode = this.spsUser.identityName;
    ticket.idParent = formGroup.idParent;
    ticket.objFiles = this.objFiles;

    if (formGroup.additionalComments) {
      let objComment = new ObjComment();
      objComment.userName = ticket.userName;
      objComment.comment = formGroup.additionalComments;
      objComment.commentDate = new Date();
      ticket.objComments = [objComment];
    }

    formGroup.selectedEntities = this.selectedEntities;

    let data = new TicketData();
    data = formGroup;
    
    const auditoryActionPlans = this.auditoryActionPlansComponent.getActionPlans();
    ticket.actionPlans = auditoryActionPlans;
    ticket.data = JSON.stringify(data);
    return ticket;
  }

  saveTicket(ticket: any) {
    this.utils.showLoader();    
    this.ticketService.saveTicket(ticket).pipe(take(1)).subscribe(
      (res) => {
        this.goToView(res.id);
      },
      (err) => {
        this.utils.hideLoader();
      }
    );
  }

  searchEMPCode() {
    this.epmFound = false;
    const applications = this.applicationList;
    const epmCode = this.formControls.epmCode.value;
    applications.find(e => {
      if (e.epmCode === epmCode) {
        this.epmFound = !this.epmFound;
        this.formControls.applicationName.setValue(e.id);
        this.formControls.businessUnit.setValue(e.objRelationLocation.desBusinessUnit);
        this.setApplicationCheckBox(e);
        // me quede aqui, debe ir el tipo deaplicacion y el canal
        return;
      }
    });
    if (!this.epmFound) {
      this.formControls.applicationName.setValue('');
      this.openAddAppModal();
    }
  }

  openAddAppModal() {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    const materialDialogConf = modalConfig.buildModalConfig('450px');
    const dialogRef = this.dialog.open(AddAppModalComponent, materialDialogConf);

    dialogRef.afterClosed().pipe(filter(newApp => !!newApp)).subscribe(newApp => {
      this.formControls.epmCode.setValue(newApp.epmCode);
      this.formControls.applicationName.setValue('other');
      this.formControls.applicationNameOther.setValue(newApp.applicationName);
    });
  }

  openRegionModal() {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    const materialDialogConf = modalConfig.buildModalConfig("450px", {
      region: this.formGroup.controls["selectedRegions"].value,
      countries: this.formGroup.controls["selectedCountries"].value,
    });
    const dialogRef = this.dialog.open(
      RegionModalComponent,
      materialDialogConf
    );

    dialogRef
      .afterClosed()
      .pipe(filter((location) => !!location))
      .subscribe((location: Location) => {
        this.setLocationToForm(location);
        this.setApplicationList(location);
      });
  }

  setLocationToForm(location: Location) {
    this.formGroup.controls['selectedRegions'].setValue(location.region);
    this.regionDesc = location.region.value;
    this.selectedEntities = location.entities;
    this.formGroup.controls['selectedCountries'].setValue(location.countries);
    this.countriesList = this.getArrayDesc(location.countries);
    this.formGroup.controls['entity'].setValue(this.locationToObjLocation(location.entities));
    this.entitiesList = this.getArrayDesc(location.entities);
    this.formGroup.controls['localCiso'].setValue(location.localCiso);
  }

  setApplicationList(location: Location) {
    this.applicationList = [];
    location.entities.forEach(l => {
      const id = l.id ? l.id : l.entityId;
      this.mntService.getMaintainerByTypeParentAndId(id).subscribe(res => {
        if (res && res.length > 0) {
          res.forEach(r => {
            this.appService.getApplicationByBusinessUnit(r.id).subscribe(res => {
              if (res && res.length > 0) {
                for (let i = 0; i < res.length; i++) {
                  this.applicationList.push({ entity: l.value, ...res[i] });
                }
                this.ref.detectChanges();
              }
            });
          });
        }
      });
    });
  }

  setBusinessChannelList() {
    this.mntService.getBusinessChannel().subscribe(res => {
      if (res && res.length > 0) {
        this.businessChannelList = res;
      }
    });
  }

  onApplicationChange() {
    this.epmFound = false;
    const applications = this.applicationList;
    const applicationName = this.formControls.applicationName.value;
    applications.find(e => {
      if (e.id === applicationName) {
        this.epmFound = !this.epmFound;
        this.formControls.epmCode.setValue(e.epmCode);
        this.formControls.businessUnit.setValue(e.objRelationLocation.desBusinessUnit);
        this.setApplicationCheckBox(e);
        // this.formControls.businessChannel.setValue(e.businessChannel);
        return;
      }
    });
    if (!this.epmFound) {
      this.formControls.epmCode.setValue('');
    }
  }

  setApplicationCheckBox(types) {
    const appTypes = this.utils.setApplicationTypes(types);
    const applicationTypes = this.applicationTypes.value;

    for(let i = 0; i < applicationTypes.length; i++) {
      this.applicationType.controls[`${applicationTypes[i].value}`].setValue(
        appTypes[applicationTypes[i].id] ? appTypes[applicationTypes[i].id].value : false
      );
    }
  }

  getApplicationTypes() {
    this.mntService.getApplicationTypesList().subscribe(res => {
      if(res && res.length > 0) {
        for(let i = 0; i < res.length; i++) {
          this.applicationType.addControl(`${res[i].value}`, new FormControl(false));
        }
        this.applicationTypes.next(res);
      }
    });
  }

  locationToObjLocation(array) {
    let resp: ObjLocation[] = [];
    array.map(
      (item: any) => {
        let loc = new ObjLocation();
        loc.countryId = item.idParent;
        loc.entityId = item.id;
        loc.regionId = item.regionId;
        loc.value = item.value;
        resp.push(loc);
      }
    );
    return resp;
  }

  getArrayDesc(array: any[]) {
    let arrayDesc = "";
    array.map((item, index) => {
      if (index + 1 == array.length) {
        arrayDesc += item.value;
      } else {
        arrayDesc += item.value + ", ";
      }
    });
    return arrayDesc;
  }

  goToView(ticketId) {
    this.redirectService.redirectTo((this.isChild ? '../../view/' : '../view/') + ticketId, true, this.activatedRoute, 4500, false);
  }

  getFileByControl(control) {
    if (this.ticket.objFiles) {
      return this.ticket.objFiles.find(objFile => objFile.nameControl == control);
    } else {
      return this.objFiles.find(objFile => objFile.nameControl == control);
    }
  }

  pushObjFile(objFile: ObjFile) {
    objFile.idTicket = this.ticket.id;
    let index = this.objFiles.findIndex(of => of.nameControl == objFile.nameControl);
    if (index > -1) {
      objFile.id = this.objFiles[index].id;
      this.objFiles[index] = objFile;
    } else {
      this.objFiles.push(objFile);
    }
    this.formGroup.controls.objFiles.setValue(this.objFiles);
  }

  getInitialData() {
    forkJoin([
      this.mntService.getSafetyCategoryList(),
      this.mntService.getRiskLevelList(),
      this.mntService.getHealthStatusList(),
      this.mntService.getResponsableList(),
      this.mntService.getManagerList(),
      this.mntService.getAuditCheckStatusList(),
      this.mntService.getImplementationList(),
    ]).subscribe(([res1, res2, res3, res4, res5, res6, res7]) => {
      this.safetyCategoryList = res1;
      this.riskLevelList = res2;
      this.healthStatusList = res3;
      this.responsableList = res4;
      this.managerList = res5;
      this.auditCheckStatusList = res6;
      this.implementationList = res7;
    })
  }

  canBeClosedCheck() {
    let apAreDone = true;
    if (this.ticket.objActionPlans)
      this.ticket.objActionPlans.forEach(
        (ap) => {
          if (ap.progress < 100)
            apAreDone = false;
        });
    
    this.canBeClosed = (this.ticket.progress == 100) && apAreDone;
  }
}
