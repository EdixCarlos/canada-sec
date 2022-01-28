import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FprCreateComponent } from './fpr/fpr-create/fpr-create.component';
import { MadCreateComponent } from './mad/mad-create/mad-create.component';
import { OrCreateComponent } from './or/or-create/or-create.component';
import { RdalCreateComponent } from './rdal/rdal-create/rdal-create.component';
import { SaprCreateComponent } from './sapr/sapr-create/sapr-create.component';
import { TraCreateComponent } from './tra/tra-create/tra-create.component';
import { VsaCreateComponent } from './vsa/vsa-create/vsa-create.component';

const routes: Routes = [{
  path: 'fir-por-req/create',
  component: FprCreateComponent
}, {
  path: 'fir-por-req/view/:id',
  component: FprCreateComponent
}, {
  path: 'fir-por-req/create/:idParent',
  component: FprCreateComponent
}, {
  path: 'mer-acq-div/create',
  component: MadCreateComponent
}, {
  path: 'mer-acq-div/view/:id',
  component: MadCreateComponent
}, {
  path: 'mer-acq-div/create/:idParent',
  component: MadCreateComponent
}, {
  path: 'other-req/create',
  component: OrCreateComponent
}, {
  path: 'other-req/view/:id',
  component: OrCreateComponent
}, {
  path: 'other-req/create/:idParent',
  component: OrCreateComponent
}, {
  path: 'ris-dev-acc-let/create',
  component: RdalCreateComponent
}, {
  path: 'ris-dev-acc-let/view/:id',
  component: RdalCreateComponent
}, {
  path: 'ris-dev-acc-let/create/:idParent',
  component: RdalCreateComponent
}, {
  path: 'sec-art-pee-rev/create',
  component: SaprCreateComponent
}, {
  path: 'sec-art-pee-rev/view/:id',
  component: SaprCreateComponent
}, {
  path: 'sec-art-pee-rev/create/:idParent',
  component: SaprCreateComponent
}, {
  path: 'thr-ris-asm/create',
  component: TraCreateComponent
}, {
  path: 'thr-ris-asm/view/:id',
  component: TraCreateComponent
}, {
  path: 'thr-ris-asm/create/:idParent',
  component: TraCreateComponent
}, {
  path: 'ven-sec-asm/create',
  component: VsaCreateComponent
}, {
  path: 'ven-sec-asm/view/:id',
  component: VsaCreateComponent
}, {
  path: 'ven-sec-asm/create/:idParent',
  component: VsaCreateComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvisoryRoutingModule { }
