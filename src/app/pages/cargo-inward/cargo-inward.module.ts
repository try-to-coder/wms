import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargoInwardRoutingModule } from './cargo-inward-routing.module';
import { CargoInwardComponent } from './cargo-inward.component';
import { ManualInwardListComponent } from './manual-inward-list/manual-inward-list.component';
import { ManualInwardImportComponent } from './manual-inward-import/manual-inward-import.component';
import { ManualInwardScanComponent } from './manual-inward-scan/manual-inward-scan.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { CargoOutwardScanComponent } from './cargo-outward-scan/cargo-outward-scan.component';


@NgModule({
  declarations: [
    CargoInwardComponent,
    ManualInwardListComponent,
    ManualInwardImportComponent,
    ManualInwardScanComponent,
    CargoOutwardScanComponent
  ],
  imports: [
    CommonModule,
    CargoInwardRoutingModule,
    FormsModule,
    DataTablesModule,
  ]
})
export class CargoInwardModule { }
