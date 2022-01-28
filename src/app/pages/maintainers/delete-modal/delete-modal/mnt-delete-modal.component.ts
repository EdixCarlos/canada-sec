import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ModuleAppMaintainer, ModuleAppPvt } from 'src/app/core/model/maintainers';
import { MaintainersDataSource } from 'src/app/core/tables/maintainers.datasource';
import { ModuleappDataSource } from 'src/app/core/tables/moduleapp.datasource';
import { RelationsDataSource } from 'src/app/core/tables/relations.datasource';
import { ServicesDataSource } from 'src/app/core/tables/services.datasource';
import { SlaDataSource } from 'src/app/core/tables/sla.datasource';
import { MaintainersService } from 'src/app/core/_services/maintainers.service';
import { ModuleappService } from 'src/app/core/_services/moduleapp.service';
import { RelationsService } from 'src/app/core/_services/relations.service';
import { ServicesService } from 'src/app/core/_services/services.service';
import { SlaService } from 'src/app/core/_services/sla.service';

@Component({
  selector: 'app-mnt-delete-modal',
  templateUrl: './mnt-delete-modal.component.html',
  styleUrls: ['./mnt-delete-modal.component.scss']
})
export class MntDeleteModalComponent implements OnInit {
  
 
  dataSource: any;
  label: string;

  constructor(
    private generalService: MaintainersService,
    private servicesService: ServicesService,
    private slasService: SlaService,
    private appService: ModuleappService,
    private rltsService: RelationsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.label = this.data.value;    
  }

  delete() {  
    this.checkSource(this.data.source);
    this.dataSource.deleteItem(this.data.id)
    .subscribe({
        next: () => { this.closeModal(); },
        error: () => {}
      });
    
  }

  checkSource(value: number){
    switch(value){
      case 1:
        this.dataSource = new MaintainersDataSource(this.generalService);
        break;
      case 2:
        this.dataSource = new ServicesDataSource(this.servicesService);
        break;
      case 3:
        this.dataSource = new SlaDataSource(this.slasService);
        break;
      case 4:
        this.dataSource = new ModuleappDataSource(this.appService);
          break;
      case 5:
        this.dataSource = new RelationsDataSource(this.rltsService);
          break;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
