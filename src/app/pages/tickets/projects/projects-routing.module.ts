import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProCreateComponent } from './pro/pro-create/pro-create.component';

const routes: Routes = [{
  path: 'project/create',
  component: ProCreateComponent
}, {
  path: 'project/view/:id',
  component: ProCreateComponent
}, {
  path: 'project/create/:idParent',
  component: ProCreateComponent
}, {
  path: 'project/view/:idActionPlan/:idParent',
  component: ProCreateComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
