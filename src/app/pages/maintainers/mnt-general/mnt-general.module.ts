import { NgModule } from '@angular/core';

import { MntGeneralRoutingModule } from './mnt-general-routing.module';
import { MntGeneralComponent } from './mnt-general.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { MntAddModalComponent } from './mnt-add-modal/mnt-add-modal.component';
import { MntDeleteModalModule } from '../delete-modal/delete-modal/mnt-delete-modal.module';

@NgModule({
  declarations: [MntGeneralComponent,MntAddModalComponent],
  imports: [
    SharedModule,
    MntGeneralRoutingModule,
    TranslateModule,
    MntDeleteModalModule
  ],
  entryComponents: [    
    MntAddModalComponent
  ]
})
export class MntGeneralModule { }
