import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxMasterRoutingModule } from './tax-master-routing.module';
import { TaxMasterComponent } from './tax-master.component';
import { TaxComponent } from './components/tax/tax.component';
import { TaxGroupComponent } from './components/tax-group/tax-group.component';
import { TaxTypeComponent } from './components/tax-type/tax-type.component';
import { TaxConfigureComponent } from './components/tax-configure/tax-configure.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TaxMasterComponent,
    TaxComponent,
    TaxGroupComponent,
    TaxTypeComponent,
    TaxConfigureComponent
  ],
  imports: [
    CommonModule,
    TaxMasterRoutingModule,
    FormsModule
  ]
})
export class TaxMasterModule { }
