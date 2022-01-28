import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { UdfModule } from 'src/app/shared/udf/udf.module';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { UpsertTeamModalComponent } from './vulnerability-management/_common/modals/upsert-team-modal/upsert-team-modal.component';
import { RegionModalComponent } from './vulnerability-management/_common/modals/region-modal/region-modal.component';
import { SerHarTeamModalComponent } from './vulnerability-management/_common/modals/ser-har-team-modal/ser-har-team-modal.component';
import { AddAppModalComponent } from './vulnerability-management/_common/modals/add-app-modal/add-app-modal.component';
import { AddAppModalVaComponent } from './vulnerability-management/_common/modals/add-app-modal-va/add-app-modal-va.component';
import { AssignExecutorModalComponent } from './vulnerability-management/_common/modals/asign-executor-modal/assign-executor-modal.component';
import { ConfirmModalComponent } from './vulnerability-management/_common/modals/confirm-modal/confirm-modal.component';
import { SimpleConfirmModalComponent } from './vulnerability-management/_common/modals/simple-confirm-modal/simple-confirm-modal.component';
import { RiskLevelModalComponent } from './vulnerability-management/_common/modals/risk-level-modal/risk-level-modal.component';
import { UpsertScopeModalComponent } from './projects/pro/pro-create/upsert-scope-modal/upsert-scope-modal.component';

@NgModule({
  declarations: [TicketsComponent,
    UpsertTeamModalComponent,
    RegionModalComponent,
    SerHarTeamModalComponent,
    AddAppModalComponent,
    AddAppModalVaComponent,
    AssignExecutorModalComponent,
    ConfirmModalComponent,
    SimpleConfirmModalComponent,
    RiskLevelModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UdfModule,
    TranslationModule,
    TicketsRoutingModule
  ],
  entryComponents: [
    UpsertTeamModalComponent,
    SerHarTeamModalComponent,
    RegionModalComponent,
    AddAppModalComponent,
    AddAppModalVaComponent,
    AssignExecutorModalComponent,
    ConfirmModalComponent,
    SimpleConfirmModalComponent,
    RiskLevelModalComponent,
  ]
})
export class TicketsModule { }
