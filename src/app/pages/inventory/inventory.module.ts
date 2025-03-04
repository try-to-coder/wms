import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockAdjustmentListComponent } from './stock-adjustment-list/stock-adjustment-list.component';
import { StockAdjustmentImportComponent } from './stock-adjustment-import/stock-adjustment-import.component';
import { StockAdjustmentDetailComponent } from './stock-adjustment-detail/stock-adjustment-detail.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { StockAdjustmentReasonComponent } from './stock-adjustment-reason/stock-adjustment-reason.component';


@NgModule({
  declarations: [
    InventoryComponent,
    StockListComponent,
    StockAdjustmentListComponent,
    StockAdjustmentImportComponent,
    StockAdjustmentDetailComponent,
    StockAdjustmentReasonComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    DataTablesModule,
    FormsModule,
    SharedModule
  ]
})
export class InventoryModule { }
