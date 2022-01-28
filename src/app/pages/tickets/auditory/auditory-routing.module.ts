import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditoryCreateComponent } from './auditory-create/auditory-create.component';

const routes: Routes = [{
  path: 'aud-fol-up/create',
  component: AuditoryCreateComponent
}, {
  path: 'aud-fol-up/view/:id',
  component: AuditoryCreateComponent
}, {
  path: 'aud-fol-up/create/:idParent',
  component: AuditoryCreateComponent
}, {
  path: 'aud-fol-up/view/:idActionPlan/:idParent',
  component: AuditoryCreateComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditoryRoutingModule { }
