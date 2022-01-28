import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MntRequestersComponent } from './mnt-requesters.component';

const routes: Routes = [{ path: '', component: MntRequestersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MntRequestersRoutingModule { }
