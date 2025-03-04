import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialMasterRoutingModule } from './material-master-routing.module';
import { MaterialMasterComponent } from './material-master.component';
import { DecimalDirective } from 'src/app/directives/decimal.directive';
import { MaterialMasterDetailComponent } from './material-master-detail/material-master-detail.component';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    MaterialMasterComponent,
    DecimalDirective,
    MaterialMasterDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialMasterRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule
  ]
})
export class MaterialMasterModule { }
