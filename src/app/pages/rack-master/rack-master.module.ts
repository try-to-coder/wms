import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RackMasterRoutingModule } from './rack-master-routing.module';
import { RackMasterComponent } from './rack-master.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { RackMasterDetailComponent } from './rack-master-detail/rack-master-detail.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  declarations: [
    RackMasterComponent,
    RackMasterDetailComponent
  ],
  imports: [
    CommonModule,
    RackMasterRoutingModule,
    FormsModule,
    DataTablesModule,
    SharedModule
  ]
})
export class RackMasterModule { }
