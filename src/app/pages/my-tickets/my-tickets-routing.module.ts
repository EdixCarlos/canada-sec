import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTicketsComponent } from './my-tickets.component';

const routes: Routes = [
  { path: '', component: MyTicketsComponent },
  { path: 'exec', component: MyTicketsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTicketsRoutingModule { }
