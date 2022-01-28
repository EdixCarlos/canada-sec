import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MntRelationsComponent } from './mnt-relations.component';

const routes: Routes = [{ path: '', component: MntRelationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MntRelationsRoutingModule { }

