import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { StockAdjustmentDetailComponent } from './stock-adjustment-detail/stock-adjustment-detail.component';
import { StockAdjustmentImportComponent } from './stock-adjustment-import/stock-adjustment-import.component';
import { StockAdjustmentListComponent } from './stock-adjustment-list/stock-adjustment-list.component';
import { StockAdjustmentReasonComponent } from './stock-adjustment-reason/stock-adjustment-reason.component';
import { StockListComponent } from './stock-list/stock-list.component';

const routes: Routes = [
  {
    path: '', component: InventoryComponent,
    children: [
      { path: '', component: StockListComponent },
      { path: 'stock-adjustment', component: StockAdjustmentListComponent },
      { path: 'stock-adjustment-import', component: StockAdjustmentImportComponent },
      { path: 'stock-adjustment-detail', component: StockAdjustmentDetailComponent },
      { path: 'stock-adjustment-reason', component: StockAdjustmentReasonComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
