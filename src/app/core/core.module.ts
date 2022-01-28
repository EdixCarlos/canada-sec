import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomI18nLoader } from './i18n/custom-i18n-loader';



@NgModule({
  declarations: [CustomI18nLoader],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
