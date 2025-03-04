import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispatchRoutingModule } from './dispatch-routing.module';
import { DispatchComponent } from './dispatch.component';
import { DispatchListComponent } from './dispatch-list/dispatch-list.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DispatchOrderComponent } from './dispatch-order/dispatch-order.component';
import { DispatchOrderDetailComponent } from './dispatch-order-detail/dispatch-order-detail.component';


@NgModule({
  declarations: [
    DispatchComponent,
    DispatchListComponent,
    DispatchOrderComponent,
    DispatchOrderDetailComponent
  ],
  imports: [
    CommonModule,
    DispatchRoutingModule,
    DataTablesModule,
    FormsModule,
    SharedModule
  ]
})
export class DispatchModule { }
