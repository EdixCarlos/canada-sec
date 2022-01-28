import { NgModule } from '@angular/core';

import { MntAppRoutingModule } from './mnt-app-routing.module';
import { MntAppComponent } from './mnt-app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MntDeleteModalModule } from '../delete-modal/delete-modal/mnt-delete-modal.module';
import { MntAddModalComponent } from './mnt-add-modal/mnt-add-modal.component';


@NgModule({
  declarations: [MntAppComponent,MntAddModalComponent],
  imports: [
    SharedModule,
    TranslateModule,
    MntDeleteModalModule,
    MntAppRoutingModule
  ],
  entryComponents: [    
    MntAddModalComponent
  ]
})
export class MntAppModule { }