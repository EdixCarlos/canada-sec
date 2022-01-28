import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MntAppComponent } from './mnt-app.component';

const routes: Routes = [{ path: '', component: MntAppComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MntAppRoutingModule { }
