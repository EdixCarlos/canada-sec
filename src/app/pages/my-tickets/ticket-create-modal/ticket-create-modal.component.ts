import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Service } from 'src/app/core/model/service';
import { SubService } from 'src/app/core/model/sub-service';
import { RequestType } from 'src/app/core/model/request-type';
import { ValidatorsService } from 'src/app/core/_services/validators.service';
import { ServicesCascadeService } from 'src/app/core/_services/services-cascade.service';
import { take } from 'rxjs/operators';
import { RequestTypeSelectedService } from 'src/app/core/_services/request-type-selected.service';
import { ServicesService } from 'src/app/core/_services/services.service';

@Component({
  selector: 'app-ticket-create-modal',
  templateUrl: './ticket-create-modal.component.html',
  styleUrls: ['./ticket-create-modal.component.scss']
})
export class TicketCreateModalComponent implements OnInit {
  formGroup: FormGroup;
  services: Service[] = [];
  subServices: SubService[] = [];
  requestTypes: RequestType[] = [];
  selectedFormName;
  useReqType = false;
  selectedServiceId;

  constructor(
    public dialogRef: MatDialogRef<TicketCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public validatorService: ValidatorsService,
    private router: Router,
    private scService: ServicesCascadeService,
    private servicesService: ServicesService,
    private selectedRequestTypeService: RequestTypeSelectedService
  ) { }

  get formControls() {
    return this.formGroup.controls;
  }

  log(object: any) {
    console.log(object)
  }

  ngOnInit(): void {
    this.loadForm();
    this.loadServicesList();
  }

  loadForm() {
    this.formGroup = this.fb.group({
      service: ['', Validators.required],
      subService: ['', Validators.required]
    });
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
    if (event.value) {
      this.servicesService.setService(event.value);
      this.selectedServiceId = event.value.id;
      this.scService.getSubServicesByServiceId(event.value.id).pipe(take(1)).subscribe(
        (subServices) => {
          this.subServices = subServices;
        }
      );
    }
  }

  onChangeSubService(event) {
    if (event.value) {
      this.scService.getRequestTypeByServiceId(this.selectedServiceId, event.value.id).pipe(take(1)).subscribe(
        (requestTypes) => {
          if (requestTypes.length === 0) {
            this.formGroup = this.fb.group({
              service: [this.formGroup.controls['service'].value, Validators.required],
              subService: [this.formGroup.controls['subService'].value, Validators.required]
            });
            this.selectedFormName = event.value.formName;
            console.log('req type false')
            this.useReqType = false;
          }
          this.requestTypes = requestTypes;
        }
      );
    }
  }

  onChangeRequestType(event) {
    this.formGroup = this.fb.group({
      service: [this.formGroup.controls['service'].value, Validators.required],
      subService: [this.formGroup.controls['subService'].value, Validators.required],
      requestType: [event.value, Validators.required]
    });
    this.selectedFormName = event.value.formName;
    this.useReqType = true;
    this.selectedRequestTypeService.setRequestType(event.value);
    console.log('req type true')
  }

  closeModal() {
    this.dialogRef.close();
  }

  createTicket() {
    if (this.formGroup.valid) {
      let ticketPath: string;
      const service: Service = this.formGroup.controls['service'].value;
      const subService: SubService = this.formGroup.controls['subService'].value;
      if (this.useReqType) {
        console.log('using req type')
        const requestType: RequestType = this.formGroup.controls['requestType'].value;
        console.log(this.formGroup)
        ticketPath = `tickets/${service.code}/${subService.code}/${requestType.code}/create` //vm
      } else {
        ticketPath = `tickets/${service.code}/${subService.code}/create` //vm
      }

      console.log('ticketPath', ticketPath);
6
      this.router.navigate([`${ticketPath}`]);
      this.closeModal();
    } else {
      console.log('form not valid');
      this.validatorService.validateFormFields(this.formGroup);
      console.log(this.formGroup)
    }
  }
}
