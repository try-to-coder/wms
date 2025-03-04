import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AllMarkSelectComponent } from 'src/app/components/all-mark-select/all-mark-select.component';
import { DateFilterFieldComponent } from 'src/app/components/date-filter-field/date-filter-field.component';

@NgModule({
  declarations: [
    AllMarkSelectComponent,
    DateFilterFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AllMarkSelectComponent,
    DateFilterFieldComponent
  ]
})
export class SharedModule { }
