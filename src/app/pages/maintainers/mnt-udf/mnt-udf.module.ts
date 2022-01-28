import { NgModule } from '@angular/core';

import { MntUdfRoutingModule } from './mnt-udf-routing.module';
import { MntUdfComponent } from './mnt-udf.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MntDeleteModalComponent } from './mnt-delete-modal/mnt-delete-modal.component';
import { MntEditModalComponent } from './mnt-edit-modal/mnt-edit-modal.component';


@NgModule({
  declarations: [
    MntUdfComponent, 
    MntEditModalComponent, 
    MntDeleteModalComponent
  ],
  imports: [
    SharedModule,
    TranslateModule,
    MntUdfRoutingModule
  ],
  entryComponents: [
    MntDeleteModalComponent,
    MntEditModalComponent
  ]
})
export class MntUdfModule { }
