import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelPrinterRoutingModule } from './label-printer-routing.module';
import { LabelPrinterComponent } from './label-printer.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    LabelPrinterComponent
  ],
  imports: [
    CommonModule,
    LabelPrinterRoutingModule,
    FormsModule,
    DataTablesModule
  ]
})
export class LabelPrinterModule { }
