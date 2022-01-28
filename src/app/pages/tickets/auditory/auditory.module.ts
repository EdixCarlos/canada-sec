import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditoryRoutingModule } from './auditory-routing.module';
import { AuditoryCreateComponent } from './auditory-create/auditory-create.component';
import { AuditoryViewComponent } from './auditory-view/auditory-view.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { UdfModule } from 'src/app/shared/udf/udf.module';
import { ActionButtonsModule } from '../vulnerability-management/_common/action-buttons/action-buttons.module';
import { FileUploadModule } from '../vulnerability-management/_common/file-upload/file-upload.module';
import { ActionPlansModule } from '../vulnerability-management/_common/action-plans/action-plans.module';
import { AuditoryActionPlansComponent } from './auditory-action-plans/auditory-action-plans.component';
import { AuditoryActionPlansModalComponent } from './auditory-action-plans-modal/auditory-action-plans-modal.component';

@NgModule({
  declarations: [
    AuditoryCreateComponent, 
    AuditoryViewComponent, 
    AuditoryActionPlansComponent, 
    AuditoryActionPlansModalComponent,
  ],
  imports: [
    CommonModule,
    AuditoryRoutingModule,
    UdfModule,
    SharedModule,
    ActionButtonsModule,
    FileUploadModule,
    ActionPlansModule,
    TranslateModule,
  ]
})
export class AuditoryModule { }
