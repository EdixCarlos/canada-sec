import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CardContainerModule } from "./layout/card-container/card-container.module";
import { BaseModalComponent } from "./modals/base-modal/base-modal.component";
import { ControlErrorComponent } from "./validator/control-error/control-error.component";
import { OnlyNumberDirective } from './directive/only-number.directive';
import { OnlyLetterDirective } from './directive/only-letter.directive';
import { NumberDecimalDirective } from './directive/number-decimal.directive';
import { NoWhitespaceDirective } from './directive/no-whitespace.directive';
import { PercentageDirective } from './directive/percentage.directive';
import { EmailDirective } from './directive/email.directive';

//Material
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [
    BaseModalComponent, 
    ControlErrorComponent, 
    OnlyNumberDirective,
    OnlyLetterDirective, 
    NumberDecimalDirective,
    NoWhitespaceDirective,
    PercentageDirective,
    EmailDirective,
  ],
  imports: [
    CommonModule,
    CardContainerModule,
    ReactiveFormsModule,
    //Angular Material
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  exports: [
    CommonModule,
    CardContainerModule,
    ReactiveFormsModule,
    BaseModalComponent,
    ControlErrorComponent,
    OnlyNumberDirective,
    OnlyLetterDirective, 
    NumberDecimalDirective,
    NoWhitespaceDirective,
    PercentageDirective,
    EmailDirective,
    //Angular Material
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
  ],
})
export class SharedModule {}
