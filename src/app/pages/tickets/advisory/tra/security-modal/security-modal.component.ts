import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TicketSecurity } from 'src/app/core/model/advisor-tra';
import { ModuleappDataSource } from 'src/app/core/tables/moduleapp.datasource';
import { TraDataSource } from 'src/app/core/tables/tra.datasource';
import { ChecklistService } from 'src/app/core/_services/checklist.service';
import { ModuleappService } from 'src/app/core/_services/moduleapp.service';
import { ValidatorsService } from 'src/app/core/_services/validators.service';
import { PAGINATOR_DEFAULTS } from 'src/app/shared/constants';

@Component({
  selector: 'app-security-modal',
  templateUrl: './security-modal.component.html',
  styleUrls: ['./security-modal.component.scss']
})
export class SecurityModalComponent implements OnInit {


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  pageSize = PAGINATOR_DEFAULTS.pageSize;
  pageSizeOptions = PAGINATOR_DEFAULTS.pageSizeOptions;
  buttonfl = PAGINATOR_DEFAULTS.buttonfl;

  formGroup: FormGroup;

  fields: TraDataSource;

  select: ModuleappDataSource;
  selectSource: any;
  dataSource: MatTableDataSource<any>;

  idArr: number;

  displayedColumns = ["domain", "controls", "nist", "optioner", "information"];

  constructor(
    private mntService: ChecklistService,
    public dialogRef: MatDialogRef<SecurityModalComponent>,
    private fb: FormBuilder,
    public validatorService: ValidatorsService,
    private chkService: ChecklistService,
    private moduleApp: ModuleappService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  ngOnInit(): void {
    this.loadForm();
    this.load();

  }

  loadForm() {
    this.formGroup = this.fb.group({
      field: [''],
      values: this.fb.array([]),
    });
  }

  get values(): FormArray {
    return this.formGroup.get('values') as FormArray;
  }

  get formControls() {
    return this.formGroup.controls;
  }

  load() {
    this.select = new ModuleappDataSource(this.moduleApp);
    this.select.loadEPMServices(4)
      .subscribe(
        data => {
          this.selectSource = data;
        });
  }

  applyFilter(event) {
    const length = this.values.length;
    this.deleteFormArrays(length);
    const type = this.formControls.field.value;

    if (this._tpmRows[type].rows == 0) {
      this.chkService.getDataSecurityTeam(event.value).subscribe(res => {
        console.log(res)
        for (let i = 0; i < res.length; i++) {
          res[i].placeholder = res[i].additionalInformation;
          res[i].additionalInformation = '';
          this.createRows();
        }
        this.formGroup.patchValue({ values: res });
        this.dataSource = new MatTableDataSource(this.values.controls);
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.getTmp(type);
    }
  }

  setTmp() {
    const type = this.formControls.field.value;
    this._tpmRows[type].rows = this.values.getRawValue();
    console.log(this._tpmRows);
  }

  getTmp(type: string) {
    for (let i = 0; i < this._tpmRows[type].rows.length; i++) {
      this.createRows();
    }
    this.formGroup.patchValue({ values: this._tpmRows[type].rows });
    this.dataSource = new MatTableDataSource((this.formGroup.get('values') as FormArray).controls);
    this.dataSource.paginator = this.paginator;
  }

  deleteFormArrays(length: number) {
    while (this.values.length !== 0) {
      this.values.removeAt(0);
    }
  }

  createRows() {
    this.values.push(
      this.fb.group(
        {
          id: new FormControl(),
          domain: new FormControl(),
          securityControl: new FormControl(),
          nistDomain: new FormControl(),
          optioner: new FormControl(null, Validators.required),
          additionalInformation: new FormControl(),
          //comments: new FormControl(null, Validators.required),
          placeholder: new FormControl(),
        }
      )
    );
  }

  conso(object) {
    console.log(object);
  }


  putDataSecurityTeam() {

    let list: TicketSecurity[] = [];

    this.fields = new TraDataSource(this.chkService);
    Object.entries(this._tpmRows).forEach(([key, value]) => {
      for (let i = 0; i < value.rows.length; i++) {
        const valueLocal = value.rows[i];
        if (valueLocal.optioner !== null) {
          let json: TicketSecurity = new TicketSecurity();
          json.idTicket = this.data.id;
          json.idSecurityCheckList = valueLocal.id;
          json.value = valueLocal.optioner;
          json.additionalInformation = valueLocal.additionalInformation;
          list.push(json);
        }
      }
    });
    console.log(list)
    this.fields.putDataSecurityTeam(list)
      .subscribe(
        () => {
          this.dialogRef.close();
        }
      );
  }

  closeModal() {
    this.dialogRef.close();
  }

  getRawDataValues(): any {
    return this.formGroup.getRawValue().value;
  }

  public _tpmRows = {
    1: {
      type: 'advisor',
      rows: [],
    },
    2: {
      rows: []
    },
    3: {
      rows: []
    },
    4: {
      rows: []
    },
    5: {
      rows: []
    },
  }

  checkValidate() {
    this.formGroup.markAsDirty();
    if (!this.formGroup.valid) return false;
    return true;
  }


  capturer(id: number) {
    this.idArr = id;
  }

}
