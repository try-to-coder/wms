import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickingRoutingModule } from './picking-routing.module';
import { PickingComponent } from './picking.component';
import { PickListComponent } from './pick-list/pick-list.component';
import { PickListDetailComponent } from './pick-list-detail/pick-list-detail.component';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PickOrderDetailComponent } from './pick-order-detail/pick-order-detail.component';
import { PickListModalComponent } from './pick-list-modal/pick-list-modal.component';
import { PickOrderImportComponent } from './pick-order-import/pick-order-import.component';


@NgModule({
  declarations: [
    PickingComponent,
    PickListComponent,
    PickOrderImportComponent,
    PickOrderDetailComponent,
    
    PickListDetailComponent,
    PickListModalComponent
  ],
  imports: [
    CommonModule,
    PickingRoutingModule,
    DataTablesModule,
    FormsModule,
    SharedModule
  ]
})
export class PickingModule { }
