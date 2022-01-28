import { NgModule } from '@angular/core';

import { MntRequestersRoutingModule } from './mnt-requesters-routing.module';
import { MntRequestersComponent } from './mnt-requesters.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { MntAddModalComponent } from './mnt-add-modal/mnt-add-modal.component';
import { MntDeleteModalModule } from '../delete-modal/delete-modal/mnt-delete-modal.module';

@NgModule({
  declarations: [MntRequestersComponent,MntAddModalComponent],
  imports: [
    SharedModule,
    MntRequestersRoutingModule,
    TranslateModule,
    MntDeleteModalModule
  ],
  entryComponents: [    
    MntAddModalComponent
  ]
})
export class MntRequestersModule { }
