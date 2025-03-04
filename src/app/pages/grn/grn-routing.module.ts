import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGrnComponent } from './add-grn/add-grn.component';
import { GrnDetailComponent } from './grn-detail/grn-detail.component';
import { GrnImportComponent } from './grn-import/grn-import.component';
import { GrnListComponent } from './grn-list/grn-list.component';
import { GrnComponent } from './grn.component';
import { StockReceiveComponent } from './stock-receive/stock-receive.component';

const routes: Routes = [
  {
    path: '', component: GrnComponent,
    children: [
      { path: '', component: GrnListComponent },
      { path: 'detail', component: GrnDetailComponent },
      { path: 'import', component: GrnImportComponent },
      { path: 'stock-receive', component: StockReceiveComponent },
      {path:'add-grn',component:AddGrnComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrnRoutingModule { }
