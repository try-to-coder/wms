import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrnRoutingModule } from './grn-routing.module';
import { GrnComponent } from './grn.component';
import { GrnDetailComponent } from './grn-detail/grn-detail.component';
import { GrnImportComponent } from './grn-import/grn-import.component';
import { GrnListComponent } from './grn-list/grn-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { StockReceiveComponent } from './stock-receive/stock-receive.component';
import { AddGrnComponent } from './add-grn/add-grn.component';


@NgModule({
  declarations: [
    GrnComponent,
    GrnDetailComponent,
    GrnImportComponent,
    GrnListComponent,
    StockReceiveComponent,
    AddGrnComponent
  ],
  imports: [
    CommonModule,
    GrnRoutingModule,
    DataTablesModule,
    FormsModule,
    SharedModule
  ]
})
export class GrnModule { }
