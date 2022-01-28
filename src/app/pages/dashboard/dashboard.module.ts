import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ChardeletePipe } from 'src/app/shared/pipes/chardelete.pipe';
import { DoughnutIe11Component } from './graphs/ie11-compat/doughnut-ie11/doughnut-ie11.component';
import { CakePrincipalIe11Component } from './graphs/ie11-compat/cake-principal-ie11/cake-principal-ie11.component';
import { BarsIe11Component } from './graphs/ie11-compat/bars-ie11/bars-ie11.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
// import { DashboardsModule } from '../../_metronic/partials/content/dashboards/dashboards.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ChardeletePipe,
    DoughnutIe11Component,
    CakePrincipalIe11Component,
    BarsIe11Component
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
})
export class DashboardModule { }
