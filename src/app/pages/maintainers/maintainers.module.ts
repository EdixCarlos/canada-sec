import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintainersRoutingModule } from './maintainers-routing.module';
import { MaintainersComponent } from './maintainers.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MaintainersComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaintainersRoutingModule
  ]
})
export class MaintainersModule { }
