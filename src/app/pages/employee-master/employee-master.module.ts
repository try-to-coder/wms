import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeMasterRoutingModule } from './employee-master-routing.module';
import { EmployeeMasterComponent } from './employee-master.component';
import { DataTablesModule } from 'angular-datatables';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  declarations: [
    EmployeeMasterComponent,
    EmployeeDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmployeeMasterRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule
  ]
})
export class EmployeeMasterModule { }
