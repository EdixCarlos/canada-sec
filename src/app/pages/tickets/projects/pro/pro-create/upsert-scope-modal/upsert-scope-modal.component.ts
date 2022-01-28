import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from 'src/app/core/model/country';
import { Region } from 'src/app/core/model/region';
import { Location } from 'src/app/core/model/location';
import { MaintainersService } from 'src/app/core/_services/maintainers.service';
import { ValidatorsService } from 'src/app/core/_services/validators.service';

@Component({
  selector: 'app-upsert-scope-modal',
  templateUrl: './upsert-scope-modal.component.html',
  styleUrls: ['./upsert-scope-modal.component.scss']
})
export class UpsertScopeModalComponent implements OnInit {
  formGroup: FormGroup;
  regionId = 0;
  countryList: Country[] = [];
  selectedCountry: any;
  regionList: Region[] = [];
  countries: FormArray;
  entityList: any[] = [];
  selectedEntity: any;
  cisoLocal: string = '';

  constructor(
    private mntService: MaintainersService,
    public dialogRef: MatDialogRef<UpsertScopeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Location,
    private fb: FormBuilder,
    public validatorService: ValidatorsService,
    private _ref: ChangeDetectorRef
  ) {

  }

  get formControls() {
    return this.formGroup.controls;
  }

  loadForm() {
    this.formGroup = this.fb.group({
      region: ['', Validators.required],
      countries: ['', Validators.required],
      entities: ['', Validators.required],
      contacto: ['', Validators.required],
      correoContacto: ['', Validators.required],
      totalActivos: ['', Validators.required]
    });
    //this.countries = this.formGroup.get('countries') as FormArray;
  }

  setData() {
    if (this.data.region) {
      this.formGroup.controls['countries'].setValue(this.data.countries)
      this.formGroup.controls['region'].setValue(this.data.region)
      this.formGroup.controls['entities'].setValue(this.data.entities)
    }
  }

  ngOnInit(): void {
    this.loadForm();
    //this.setData();
    this.mntService.getRegions().subscribe(regions => {
      this.regionList = regions;
    })
  }

  onChangeRegion(event) {
    this.regionId = event.value.id;
    this.getCountriesByRegionId(event.value.id);
  }

  onChangeCountry(event) {
    this.entityList = [];
    this.cisoLocal = '';
    this.selectedCountry = event.value;
    console.log(event.value)
    this.getEntityByCountry(event.value);
  }

  onChangeEntity(event) {
    console.log(event.value)
    this.selectedEntity = event.value;
    this._ref.detectChanges();
  }

  getCountriesByRegionId(id) {
    this.countryList = [];
    this.mntService.getCountriesByRegionId(id).subscribe(countries => {
      this.countryList = countries;
    })
  }

  getEntityByCountry(country) {
    this.mntService.getEntityByCountryId(country.id).subscribe(entities => {
      entities.forEach(entity => {
        entity.regionId = this.regionId;
        entity.value = country.value + ' - ' + entity.value;
        this.entityList.push(entity);
      });
    })
  }

  getCisoByCountryId(country) {
    this.mntService.getCisoByCountryId(country.id).subscribe(cisos => {
      cisos.forEach(ciso => {
        ciso.value = country.value + ' - ' + ciso.value;
        if (this.cisoLocal != '') {
          this.cisoLocal = this.cisoLocal + ', ' + ciso.value;
        } else {
          this.cisoLocal = ciso.value;
        }
      });
    })
  }

  closeModal() {
    this.dialogRef.close();
  }

  save() {
    const data: any = {
      region: this.formGroup.controls['region'].value,
      country: this.selectedCountry,
      entity: this.selectedEntity,
      contacto: this.formGroup.controls['contacto'].value,
      correoContacto: this.formGroup.controls['correoContacto'].value,
      totalActivos: this.formGroup.controls['totalActivos'].value,
    }
    this.dialogRef.close(data);
  }

  // getSelectedRegion(): Region {
  //   let region: Region;
  //   region = this.regionList.filter(
  //     reg => reg.id === 
  //   )[0];
  //   return region;
  // }
}
