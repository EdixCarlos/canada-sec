import { NgModule } from '@angular/core';

import { MntServicesRoutingModule } from './mnt-services-routing.module';
import { MntServicesComponent } from './mnt-services.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { MntAddModalComponent } from './mnt-add-modal/mnt-add-modal.component';
import { MntDeleteModalModule } from '../delete-modal/delete-modal/mnt-delete-modal.module';

@NgModule({
  declarations: [MntServicesComponent, MntAddModalComponent],
  imports: [
    SharedModule,
    TranslateModule,
    MntDeleteModalModule,
    MntServicesRoutingModule
  ],
  entryComponents: [
    MntAddModalComponent
  ]
})
export class MntServicesModule { }
