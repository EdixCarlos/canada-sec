import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MntServicesComponent } from './mnt-services.component';

const routes: Routes = [{ path: '', component: MntServicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MntServicesRoutingModule { }
