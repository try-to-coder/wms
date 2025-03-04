import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialAttributesRoutingModule } from './material-attributes-routing.module';
import { MaterialAttributesComponent } from './material-attributes.component';
import { MaterialBrandComponent } from './component/material-brand/material-brand.component';
import { MaterialTypeComponent } from './component/material-type/material-type.component';
import { MaterialUomComponent } from './component/material-uom/material-uom.component';
import { MaterialModelComponent } from './component/material-model/material-model.component';
import { MaterialGroupComponent } from './component/material-group/material-group.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    MaterialAttributesComponent,
    MaterialBrandComponent,
    MaterialTypeComponent,
    MaterialUomComponent,
    MaterialModelComponent,
    MaterialGroupComponent
  ],
  imports: [
    CommonModule,
    MaterialAttributesRoutingModule,
    FormsModule ,
    DataTablesModule
  ]
})
export class MaterialAttributesModule { }
