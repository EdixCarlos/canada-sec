import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MntUdfComponent } from './mnt-udf.component';

const routes: Routes = [{ path: '', component: MntUdfComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MntUdfRoutingModule { }
