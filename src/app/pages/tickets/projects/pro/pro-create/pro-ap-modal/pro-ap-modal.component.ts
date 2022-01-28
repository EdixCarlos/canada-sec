import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaintainersService } from 'src/app/core/_services/maintainers.service';
import { ValidatorsService } from 'src/app/core/_services/validators.service';

@Component({
  selector: 'app-pro-ap-modal',
  templateUrl: './pro-ap-modal.component.html'
})
export class ProAPModalComponent implements OnInit {
  formGroup: FormGroup;
  responsableList: any[] = [{name: 'responsable'}];

  constructor(
    private mntService: MaintainersService,
    public dialogRef: MatDialogRef<ProAPModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public validatorService: ValidatorsService
  ) { 
    this.loadForm();
    console.log(data)
    if(data.updateRow) {
      // this.formGroup.controls['country'].setValue(data.updateRow.country)
      // this.formGroup.controls['hostName'].setValue(data.updateRow.hostName)
      // this.formGroup.controls['ip'].setValue(data.updateRow.ip)
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      etapa: ['', Validators.required],
      responsable:['', Validators.required],
      area:['', Validators.required],
      pais:['', Validators.required],
      fechaLimite:['', Validators.required],
      estadoSalud:['', Validators.required],
      equipo:['', Validators.required],
      descripcion:['', Validators.required],
      comentarios:['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.mntService.getCountries().subscribe(countries => {
    //   this.responsableList = countries;
    // })
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
}
