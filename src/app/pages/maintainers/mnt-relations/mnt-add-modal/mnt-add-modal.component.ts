import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RelationsMaintainer } from 'src/app/core/model/maintainers';
import { RelationsDataSource } from 'src/app/core/tables/relations.datasource';
import { RelationsService } from 'src/app/core/_services/relations.service';
import { ValidatorsService } from 'src/app/core/_services/validators.service';
import { REGEX } from 'src/app/shared/constants';


@Component({
  selector: 'app-mnt-add-modal',
  templateUrl: './mnt-add-modal.component.html',
  styleUrls: ['./mnt-add-modal.component.scss']
})

export class MntAddModalComponent implements OnInit {   

  mntG: RelationsMaintainer;
  dataTarget: RelationsDataSource;
  formGroup: FormGroup;
  label: string;
  

  constructor(
    private mntService: RelationsService,
    private fb: FormBuilder,
    public validatorService: ValidatorsService,    
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RelationsMaintainer>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
   }

  ngOnInit(): void {
    this.label = this.data.description;
    this.loadForm();
  }
  
  loadForm() {
    this.formGroup = this.fb.group({
      description: ['',[Validators.required,Validators.pattern(REGEX.regex_text)]]
    });
  }

  save() {
    console.log('create item');
    if(this.checkValidate()){
      this.dataTarget = new RelationsDataSource(this.mntService);
      this.dataTarget.CreateMaintainer(this.mntG)
      .subscribe({
        next: () => { this.closeModal(); }
      });
    }
    
  }

  checkValidate(){
    this.formGroup.markAsDirty();
    if(this.formGroup.valid){
      this.prepareProperty();
      return true;      
    } else {
      return false;
    }
  }

  private prepareProperty(){    
    const formData = this.formGroup.value;  
    this.mntG = {
      id: 0,
      type: this.data.type,
      description: this.data.description,
      value: formData.description,
      idParent: this.data.parent,
      typeParent: this.data.typeParent,
      logicalDelete: 0
    };    
    console.log('!',this.mntG)
  }
  
  get formControls() {
    return this.formGroup.controls;
  }

  closeModal() {
    this.dialogRef.close();
  }
}