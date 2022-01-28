import { NgModule } from '@angular/core';

import { MntSlaRoutingModule } from './mnt-sla-routing.module';
import { MntSlaComponent } from './mnt-sla.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { MntEditModalComponent } from './mnt-edit-modal/mnt-edit-modal.component';
import { MntAddModalComponent } from './mnt-add-modal/mnt-add-modal.component';
import { MntDeleteModalModule } from '../delete-modal/delete-modal/mnt-delete-modal.module';

@NgModule({
  declarations: [MntSlaComponent,MntAddModalComponent ,MntEditModalComponent],
  imports: [
    SharedModule,
    TranslateModule,
    MntDeleteModalModule,
    MntSlaRoutingModule
  ],
  entryComponents: [    
    MntEditModalComponent,
    MntAddModalComponent
  ]
})
export class MntSlaModule { }
