import { NgModule } from '@angular/core';

import { MntRelationsRoutingModule } from './mnt-relations-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MntDeleteModalModule } from '../delete-modal/delete-modal/mnt-delete-modal.module';
import { MntEditModalComponent } from './mnt-edit-modal/mnt-edit-modal.component';
import { MntAddModalComponent } from './mnt-add-modal/mnt-add-modal.component';
import { MntRelationsComponent } from './mnt-relations.component';


@NgModule({
  declarations: [MntRelationsComponent,MntAddModalComponent ,MntEditModalComponent],
  imports: [
    SharedModule,
    TranslateModule,
    MntDeleteModalModule,
    MntRelationsRoutingModule,
  ],
  entryComponents: [
    MntEditModalComponent,
    MntAddModalComponent,
  ]
})
export class MntRelationsModule { }
