import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { UdfModule } from 'src/app/shared/udf/udf.module';
import { FileUploadModule } from '../vulnerability-management/_common/file-upload/file-upload.module';
import { ActionPlansModule } from '../vulnerability-management/_common/action-plans/action-plans.module';
import { ActionButtonsModule } from '../vulnerability-management/_common/action-buttons/action-buttons.module';
import { ProCreateComponent } from './pro/pro-create/pro-create.component';
import { ProjectsViewComponent } from './projects-view/projects-view.component';
import { UpsertScopeModalComponent } from './pro/pro-create/upsert-scope-modal/upsert-scope-modal.component';
import { EditScopeModalComponent } from './pro/pro-create/edit-scope-modal/edit-scope-modal.component';
import { ProActionPlansModalComponent } from './pro/pro-action-plans-modal/pro-action-plans-modal.component';
import { ProActionPlansComponent } from './pro/pro-action-plans/pro-action-plans.component';


@NgModule({
  declarations: [
    ProjectsViewComponent,
    ProCreateComponent,
    UpsertScopeModalComponent,
    EditScopeModalComponent,
    ProActionPlansModalComponent,
    ProActionPlansComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    UdfModule,
    SharedModule,
    TranslateModule,
    FileUploadModule,
    ActionPlansModule,
    ActionButtonsModule
  ],
  entryComponents: [
    UpsertScopeModalComponent,
    EditScopeModalComponent,
    ProActionPlansModalComponent
  ]
})
export class ProjectsModule { }
