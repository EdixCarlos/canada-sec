import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MntSlaComponent } from './mnt-sla.component';

const routes: Routes = [{ path: '', component: MntSlaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MntSlaRoutingModule { }

