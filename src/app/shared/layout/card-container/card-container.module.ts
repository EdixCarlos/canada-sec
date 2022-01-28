import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardContainerComponent } from './card-container.component';



@NgModule({
  declarations: [CardContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CardContainerComponent
  ]
})
export class CardContainerModule { }
