import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MntGeneralComponent } from './mnt-general.component';

const routes: Routes = [{ path: '', component: MntGeneralComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MntGeneralRoutingModule { }
