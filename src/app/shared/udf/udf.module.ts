import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { UdfComponent } from './udf.component';



@NgModule({
  declarations: [UdfComponent],
  imports: [
    SharedModule,
    TranslateModule,
    CommonModule
  ],
  exports: [
    UdfComponent
  ]
})
export class UdfModule { }
