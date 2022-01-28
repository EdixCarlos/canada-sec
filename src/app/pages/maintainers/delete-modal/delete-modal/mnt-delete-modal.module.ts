import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MntDeleteModalComponent } from './mnt-delete-modal.component'


@NgModule({
  declarations: [MntDeleteModalComponent],
  imports: [
    SharedModule,
    TranslateModule,
    CommonModule
  ],
  exports: [
    MntDeleteModalComponent
  ]
})
export class MntDeleteModalModule { }
