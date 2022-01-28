import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvisoryRoutingModule } from './advisory-routing.module';
import { AdvisoryViewComponent } from './advisory-view/advisory-view.component';
import { FprCreateComponent } from './fpr/fpr-create/fpr-create.component';
import { MadCreateComponent } from './mad/mad-create/mad-create.component';
import { OrCreateComponent } from './or/or-create/or-create.component';
import { RdalCreateComponent } from './rdal/rdal-create/rdal-create.component';
import { SaprCreateComponent } from './sapr/sapr-create/sapr-create.component';
import { TraCreateComponent } from './tra/tra-create/tra-create.component';
import { VsaCreateComponent } from './vsa/vsa-create/vsa-create.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { UdfModule } from 'src/app/shared/udf/udf.module';
import { FileUploadModule } from '../vulnerability-management/_common/file-upload/file-upload.module';
import { ActionPlansModule } from '../vulnerability-management/_common/action-plans/action-plans.module';
import { ActionButtonsModule } from '../vulnerability-management/_common/action-buttons/action-buttons.module';
import { SecurityModalComponent } from './tra/security-modal/security-modal.component';


@NgModule({
  declarations: [
    AdvisoryViewComponent,
    FprCreateComponent, 
    MadCreateComponent, 
    OrCreateComponent, 
    RdalCreateComponent, 
    SaprCreateComponent, 
    TraCreateComponent, 
    VsaCreateComponent, 
    SecurityModalComponent
  ],
  imports: [
    CommonModule,
    AdvisoryRoutingModule,
    UdfModule,
    SharedModule,
    TranslateModule,
    FileUploadModule,
    ActionPlansModule,
    ActionButtonsModule    
  ]
})
export class AdvisoryModule { }
