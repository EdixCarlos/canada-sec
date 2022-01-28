import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/core/_services/validators.service';
import { DbTicket, ObjActionPlan, ObjComment, ObjFile, ObjLocation, TicketData } from "src/app/core/model/db-ticket.model";
import { Location } from "src/app/core/model/location";
import { MinLength, MaxLength, TicketType } from 'src/app/shared/constants';
import { ModalConfiguration } from 'src/app/shared/modals/config/modal.config';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModalConfig } from 'src/app/shared/modals/config/material.modal.config.impl';
import { filter, take } from 'rxjs/operators';
import { ServicesService } from 'src/app/core/_services/services.service';
import { RequestTypeSelectedService } from 'src/app/core/_services/request-type-selected.service';
import { MyTicketsService } from 'src/app/core/_services/my-tickets.service';
import { UdfService } from 'src/app/core/_services/udf.service';
import { SpsUser } from 'src/app/modules/auth/_models/sps-user.model';
import { AuthenticationService } from 'src/app/modules/auth';
import { ApplicationService } from 'src/app/core/_services/application.service';
import { MaintainersService } from 'src/app/core/_services/maintainers.service';
import { RedirectService } from 'src/app/core/_services/redirect.service';
import { CommonService } from 'src/app/core/_services/common.service';
import { ActionPlansComponent } from '../../../vulnerability-management/_common/action-plans/action-plans/action-plans.component';
import { AddAppModalComponent } from '../../../vulnerability-management/_common/modals/add-app-modal/add-app-modal.component';
import { RegionModalComponent } from '../../../vulnerability-management/_common/modals/region-modal/region-modal.component';
import { ProjectsViewComponent } from '../../projects-view/projects-view.component';
import { MatTableDataSource } from '@angular/material/table';
import { UpsertScopeModalComponent } from './upsert-scope-modal/upsert-scope-modal.component';
import { EditScopeModalComponent } from './edit-scope-modal/edit-scope-modal.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProActionPlansComponent } from '../pro-action-plans/pro-action-plans.component';
import { ExecutorService } from 'src/app/core/_services/executor.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pro-create',
  templateUrl: './pro-create.component.html',
  styleUrls: ['./pro-create.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProCreateComponent implements OnInit {

  @ViewChild(ProjectsViewComponent, { static: false })
  public projectsViewComponent: ProjectsViewComponent;

  @ViewChild(ActionPlansComponent, { static: false })
  public actionPlansComponent: ActionPlansComponent;

  @ViewChild(ProActionPlansComponent, { static: false })
  public proActionPlansComponent: ProActionPlansComponent;

  userPolicies = [];

  objFiles: ObjFile[] = [];
  sponsorList: any[] = [];
  nistCategoryList: any[] = [];
  categoryByServiceList: any[] = [];
  requestedByList: any[] = [];
  private lastIndexSelected = null;
  projectName = '';

  canBeClosed = false;
  public ticketType = TicketType[12];

  expandedElement: any | null = true;

  // For udf
  public FORM_NAME = "pro";
  private udfForm: FormGroup;
  // For udf

  public formGroup: FormGroup;

  public isNewTicket: boolean = false;
  public epmFound: boolean = false;

  public minLength = MinLength;
  public maxLength = MaxLength;

  // 
  showRequestTypeInput: boolean = false;
  countriesList: string = "";
  entitiesList: string = "";
  regionDesc: string = "";
  // 

  public spsUser: SpsUser;
  public selectedServiceId: number;
  public toUpdate: boolean = false;

  public selectedEntities = [];

  public ticket: DbTicket = new DbTicket();

  public applicationList = [];
  public businessChannelList = [];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'contacto', 'correoContacto', 'region', 'pais', 'entidad', 'totalActivos', 'actions'];

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
    private _ref: ChangeDetectorRef,
    private maintainersService: MaintainersService,
    private executorService: ExecutorService
  ) {
    this.dataSource = new MatTableDataSource([]);
    // this.actionPlanDataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.loadLists();
    this.createForm();
    this.getApplicationTypes();
    this.checkObservable();
  }

  loadLists() {
    this.maintainersService.getSponsorList().pipe(take(1)).subscribe(
      (list) => {
        this.sponsorList = list;
      }
    );
    this.maintainersService.getCategoryByServiceList().pipe(take(1)).subscribe(
      (list) => {
        this.categoryByServiceList = list;
      }
    );
    this.maintainersService.getNISTCategoryList().pipe(take(1)).subscribe(
      (list) => {
        this.nistCategoryList = list;
      }
    );
    this.ticketService.getRequesterByService(TicketType[12].idService).pipe(take(1)).subscribe(
      (list) => {
        this.requestedByList = list;
      }
    );
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
      registeredBy: ['', Validators.required],
      requestedBy: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      id: ['', Validators.required],
      requestArea: [''],
      requestType: [''],
      selectedRegions: ['', Validators.required],
      selectedCountries: ['', Validators.required],
      entity: [''],
      //localCiso: [''],
      sponsor: ['', Validators.required],
      projectName: ['', Validators.required],
      objective: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      categoryByService: ['', Validators.required],
      nistCategory: ['', Validators.required],
      scopeType: ['', Validators.required],
      assetType: ['', Validators.required],
      assetsNumber: ['', Validators.required],
      epmCode: ['', Validators.required],
      applicationName: ['', Validators.required],
      applicationNameOther: [''],
      applicationType: this.fb.group({
        // cia: [false],
        // mobile: [false],
        // payment: [false],
        // corebanking: [false],
        // ifa: [false],
        // other: [false],
        // cloudbased: [false],
      }),
      businessUnit: ['', Validators.required],
      businessChannel: ['', Validators.required],
      additionalComments: [''],
      comments: [''],
      objFiles: [],
      scope: [''],
      phasesNumber: ['', Validators.required]
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
        if (url.length > 3) {
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
            this.formControls.registeredBy.setValue(user.name);
            this.formControls.email.setValue(user.email);
            this.formControls.id.setValue(user.identityName);
            this.formControls.requestArea.setValue(user.area);
            this.userPolicies = user.policies;
          }
        );

        this.disabledInputs();
      }
    });

    this.servicesService.selectedService$.pipe(take(1)).pipe(filter(service => !!service)).subscribe(service => {
      this.selectedServiceId = service.id;
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
      this.formControls.registeredBy.disable();
      this.formControls.email.disable();
      this.formControls.id.disable();
      this.formControls.requestArea.disable();
    } else {
      this.formControls.registeredBy.disable();
      this.formControls.requestedBy.disable();
      this.formControls.email.disable();
      this.formControls.id.disable();
      this.formControls.requestArea.disable();
      this.formControls.requestType.disable();
      this.formControls.selectedRegions.disable();
      this.formControls.selectedCountries.disable();
      this.formControls.entity.disable();
      this.formControls.epmCode.disable();
      this.formControls.applicationName.disable();
      this.formControls.applicationNameOther.disable();
      this.formControls.applicationType.disable();
      this.formControls.businessUnit.disable();
      this.formControls.businessChannel.disable();
      this.formControls.sponsor.disable();
      this.formControls.projectName.disable();
      this.formControls.objective.disable();
      this.formControls.description.disable();
      this.formControls.startDate.disable();
      this.formControls.endDate.disable();
      this.formControls.categoryByService.disable();
      this.formControls.nistCategory.disable();
      this.formControls.scopeType.disable();
      this.formControls.assetType.disable();
      this.formControls.assetsNumber.disable();
      this.formControls.phasesNumber.disable();
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
        this.objFiles = this.ticket.objFiles;
        this.projectsViewComponent.checkObservable(ticket);
      }
    );

    if (this.actionPlansComponent) {
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

  updateProjectName(event: any) {
    this.projectName = event.target.value;
    this.proActionPlansComponent.udpateProjectName(this.projectName);
  }

  udpatePhasesNumber(event: any) {
    this.proActionPlansComponent.udpatePhasesNumber(event.target.value);
  }

  loadActionPlans(id, idParent) {
    // actionPlans de proyecto
    this.ticketService.getTicketById(+idParent).pipe(take(1)).subscribe(
      (ticket) => {
        this.ticket = ticket;
        if (ticket.actionPlans && ticket.actionPlans.length > 0) {
          console.log(this.spsUser);
          //this.proActionPlansComponent.setAdittionalData(id, idParent, ticket.idExecutor, JSON.parse(JSON.parse(ticket.data).datos).projectName);
          const row = ticket.actionPlans.find(e => e.id == id);
          let rowJSON = JSON.parse(row.data);
          rowJSON.id = id;
          rowJSON.idTicket = idParent;
          rowJSON.idExecutor = ticket.idExecutor;
          rowJSON.projectName = this.projectName;
          ticket.actionPlans = ticket.actionPlans.map(
            (ap) => {
              ap.projectName = JSON.parse(JSON.parse(ticket.data).datos).projectName;
              return ap;
            }
          );
          this.getRows(ticket, rows => {
            const row = rows.find((e: any) => e.id == id);
            this.proActionPlansComponent.setActionPlans(rows);
            this.proActionPlansComponent.editActionPlan(row, row.index);
          });
        }
      }
    );
  }

  mapTicketToForm() {
    const ticket: DbTicket = this.ticket;
    let form: any = {};
    let data = JSON.parse(ticket.data).datos;
    let dataJSON = JSON.parse(data);
    this.dataSource.data = dataJSON.scope;
    form.scope = dataJSON.scope;
    form.registeredBy = ticket.requesterName;
    form.email = dataJSON.email;
    form.id = ticket.id;
    form.requestArea = ticket.requesterArea;
    form.requestType = dataJSON.requestType;
    form.selectedRegions = dataJSON.selectedRegions;
    form.selectedCountries = dataJSON.selectedCountries;
    form.entity = dataJSON.entity;
    form.localCiso = dataJSON.localCiso;

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

    // if (ticket.actionPlans) {
    //   ticket.actionPlans.forEach(
    //     (ap) => {
    //       this.actionPlanDataSource.data.push(JSON.parse(ap.data));
    //     }
    //   );
    // }

    if (ticket.actionPlans && ticket.actionPlans.length > 0) {
      this.getRows(ticket, rows => {
        this.proActionPlansComponent.setActionPlans(rows);
      });
    }

    form.requestTypeName = dataJSON.entity;
    form.epmCode = dataJSON.epmCode;

    this.formGroup.patchValue({ ...form, ...dataJSON });
  }

  // ticket creado
  getRows(ticket, callBack) {
    const actionPlans = ticket.actionPlans
    let rows = [];

    this.executorService.getAvisors(this.ticketType.idService).subscribe(res => {
      actionPlans.map(e => {
        console.log(e)
        if (e.userCode == this.spsUser.identityName) {
          let data = JSON.parse(e.data);
          data.id = e.id;
          data.idTicket = e.idTicket;
          data.idExecutor = e.idExecutor;
          data.updaterName = res.find(e => e.id == data.updater) ? res.find(e => e.id == data.updater).name : null;
          rows.push(data);
        }
      });
      callBack(rows);
    });
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
      ticket.objFiles = this.objFiles;
      if (!this.isNewTicket) {
        this.updateTicket('id', ticket);
      } else {
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
    ticket.requesterName = formGroup.registeredBy;
    ticket.objLocation = formGroup.entity;
    ticket.idTicketType = 12;
    ticket.idService = 3;
    ticket.idApplication = formGroup.applicationName;
    ticket.userCode = this.spsUser.identityName;
    ticket.userName = this.spsUser.user;
    ticket.requesterCode = this.spsUser.identityName;
    ticket.idParent = formGroup.idParent;

    if (formGroup.additionalComments) {
      let objComment = new ObjComment();
      objComment.userName = ticket.userName;
      objComment.comment = formGroup.additionalComments;
      objComment.commentDate = new Date();
      ticket.objComments = [objComment];
    }

    formGroup.selectedEntities = this.selectedEntities;
    formGroup.scope = this.dataSource.data;

    // let actionPlans = [];
    // if (this.actionPlanDataSource.data.length > 0) {
    //   this.actionPlanDataSource.data.map((ap, index) => {
    //     let actionPlan: any = {};
    //     actionPlan.index = index;
    //     actionPlan.data = JSON.stringify(ap);
    //     actionPlans.push(actionPlan);
    //   });
    // }
    // ticket.actionPlans = actionPlans;

    const proActionPlans = this.proActionPlansComponent.getActionPlans();
    ticket.actionPlans = proActionPlans;

    let data = new TicketData();
    delete formGroup.objFiles;
    data = formGroup;
    ticket.data = JSON.stringify(data);
    return ticket;
  }

  updateTicket(id: string, ticket: any) {

  }

  saveTicket(ticket: any) {
    this.utils.showLoader();
    console.log(ticket);
    console.log(JSON.stringify(ticket))
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
        this.formControls.businessUnit.setValue(e.objRelationLocation.idBusinessUnit);
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

  openEditScopeModal(updateRow?: any, index?: number) {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    console.log(updateRow)
    const materialDialogConf = modalConfig.buildModalConfig('450px', { updateRow: updateRow });
    const dialogRef = this.dialog.open(EditScopeModalComponent, materialDialogConf);

    dialogRef.afterClosed().pipe(filter(details => !!details)).subscribe(details => {
      this.objFiles = [];
      this.dataSource.data[index].details = details;
      this.formGroup.controls.scope.setValue(this.dataSource.data);
      this.dataSource.filter = '';
      this._ref.detectChanges();
    });
  }

  openUpsertScopeModal(updateRow?: any, index?: number) {
    let modalConfig: ModalConfiguration = new MaterialModalConfig();
    const materialDialogConf = modalConfig.buildModalConfig('450px', { updateRow: updateRow });
    const dialogRef = this.dialog.open(UpsertScopeModalComponent, materialDialogConf);

    dialogRef.afterClosed().pipe(filter(scope => !!scope)).subscribe(scope => {
      console.log(scope);
      this.objFiles = [];
      if (!updateRow) {
        this.dataSource.data.push(scope);
      }
      else {
        this.dataSource.data[index] = scope;
      }
      this.formGroup.controls.scope.setValue(this.dataSource.data);
      this.dataSource.filter = '';
      this._ref.detectChanges();
    });
  }

  deleteTeam(index) {
    this.dataSource.data.splice(index, 1);
    this.dataSource.filter = '';
  }

  // openProAPModal(updateRow?: any, index?: number) {
  //   let modalConfig: ModalConfiguration = new MaterialModalConfig();
  //   let isNewRow = false;
  //   if (!updateRow) {
  //     isNewRow = true;
  //     updateRow = {};
  //     updateRow.projectName = this.formGroup.controls.projectName.value;
  //   }
  //   if (!index) {
  //     index = this.actionPlanDataSource.data.length;
  //   }
  //   const materialDialogConf = modalConfig.buildModalConfig('450px', { updateRow: updateRow, index: index });
  //   const dialogRef = this.dialog.open(ProAPModalComponent, materialDialogConf);

  //   dialogRef.afterClosed().pipe(filter(proAP => !!proAP)).subscribe(proAP => {
  //     proAP.nombreProyecto = this.formGroup.controls.projectName.value;
  //     console.log(proAP);
  //     //this.objFiles = [];
  //     if (isNewRow) {
  //       this.actionPlanDataSource.data.push(proAP);
  //     }
  //     else {
  //       this.actionPlanDataSource.data[index] = proAP;
  //     }
  //     //this.formGroup.controls.teams.setValue(this.actionPlanDataSource.data);
  //     this.actionPlanDataSource.filter = '';
  //     this._ref.detectChanges();
  //   });
  // }

  deleteAP(index) {
    this.dataSource.data.splice(index, 1);
    this.dataSource.filter = '';
  }

  setLocationToForm(location: Location) {
    this.formGroup.controls['selectedRegions'].setValue(location.region);
    this.regionDesc = location.region.value;
    this.selectedEntities = location.entities;
    this.formGroup.controls['selectedCountries'].setValue(location.countries);
    this.countriesList = this.getArrayDesc(location.countries);
    this.formGroup.controls['entity'].setValue(this.locationToObjLocation(location.entities));
    this.entitiesList = this.getArrayDesc(location.entities);
    //this.formGroup.controls['localCiso'].setValue(location.localCiso);
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
                this._ref.detectChanges();
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
        this.formControls.businessUnit.setValue(e.objRelationLocation.idBusinessUnit);
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

    for (let i = 0; i < applicationTypes.length; i++) {
      this.applicationType.controls[`${applicationTypes[i].value}`].setValue(
        appTypes[applicationTypes[i].id] ? appTypes[applicationTypes[i].id].value : false
      );
    }
  }

  getApplicationTypes() {
    this.mntService.getApplicationTypesList().subscribe(res => {
      if (res && res.length > 0) {
        for (let i = 0; i < res.length; i++) {
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

  goToList() {
    this.redirectService.redirectTo('/my-tickets', false, null, 0, false);
  }

  getFileByControl(control) {
    if (this.ticket.objFiles) {
      return this.ticket.objFiles.find(objFile => objFile.nameControl == control);
    } else {
      return this.objFiles.find(objFile => objFile.nameControl == control);
    }

  }

  getTicketDetail(index, row) {
    console.log(index)
    console.log(this.lastIndexSelected)
    if (this.lastIndexSelected == index) {
      this.expandedElement = null;
      this.lastIndexSelected = null;
    } else {
      this.expandedElement = row;
      this.lastIndexSelected = index;
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

  compareObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }


}
