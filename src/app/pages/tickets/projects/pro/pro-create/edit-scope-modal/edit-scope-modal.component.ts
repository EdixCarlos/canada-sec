import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaintainersService } from 'src/app/core/_services/maintainers.service';
import { ValidatorsService } from 'src/app/core/_services/validators.service';
import { ESTADO_PROYECTO } from 'src/app/shared/constants';

@Component({
  selector: 'app-edit-scope-modal',
  templateUrl: './edit-scope-modal.component.html'
})
export class EditScopeModalComponent implements OnInit {
  formGroup: FormGroup;
  responsableList: any[] = [];
  estadoProyectoList: any[] = ESTADO_PROYECTO;
  

  constructor(
    private mntService: MaintainersService,
    public dialogRef: MatDialogRef<EditScopeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public validatorService: ValidatorsService
  ) { 
    this.loadForm();
    if(data.updateRow.details) {
      this.formGroup.patchValue({...data.updateRow.details});
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      estadoSalud: ['', Validators.required],
      fechaInicio:['', Validators.required],
      fechaCierre:['', Validators.required],
      comentarios:['', Validators.required],
      razonDemora:['', Validators.required],
      estadoProyecto:['', Validators.required],
      activosRealizados:['', Validators.required],
      activosPendientes:['', Validators.required],
      avanceProyecto:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.mntService.getCountries().subscribe(countries => {
      this.responsableList = countries;
    })
  }

  closeModal(){
    this.dialogRef.close();
  }

  save(){
    let data: any = this.formGroup.getRawValue();
    this.dialogRef.close(data);
  }  

  get formControls(){
    return this.formGroup.controls;
  }

  compareObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }
}
