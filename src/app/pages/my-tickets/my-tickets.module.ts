import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTicketsRoutingModule } from './my-tickets-routing.module';
import { MyTicketsComponent } from './my-tickets.component';
import { TicketCreateModalComponent } from './ticket-create-modal/ticket-create-modal.component';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MyTicketsComponent, 
    TicketCreateModalComponent,
  ],
  imports: [
    CommonModule,
    MyTicketsRoutingModule,
    SharedModule,
    TranslateModule,
  ],
  entryComponents: [
    TicketCreateModalComponent,
  ]
})
export class MyTicketsModule { }
