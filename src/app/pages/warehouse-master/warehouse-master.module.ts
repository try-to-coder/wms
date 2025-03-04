import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WarehouseMasterRoutingModule } from './warehouse-master-routing.module';
import { WarehouseMasterComponent } from './warehouse-master.component';
import { NumberDirective } from 'src/app/directives/number.directive';
import { WarehouseMasterDetailComponent } from './warehouse-master-detail/warehouse-master-detail.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    WarehouseMasterComponent,
    WarehouseMasterDetailComponent
  ],
  imports: [
    CommonModule,
    WarehouseMasterRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule
  ]
})
export class WarehouseMasterModule { }
