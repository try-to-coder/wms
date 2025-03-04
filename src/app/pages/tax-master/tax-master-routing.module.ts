import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxConfigureComponent } from './components/tax-configure/tax-configure.component';
import { TaxGroupComponent } from './components/tax-group/tax-group.component';
import { TaxTypeComponent } from './components/tax-type/tax-type.component';
import { TaxComponent } from './components/tax/tax.component';
import { TaxMasterComponent } from './tax-master.component';

const routes: Routes = [{ path: '', component: TaxMasterComponent,children:[
 {path:'',component:TaxConfigureComponent},
 {path:'tax-group',component:TaxGroupComponent},
 {path:'tax',component:TaxComponent},
 {path:'tax-type',component:TaxTypeComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxMasterRoutingModule { }
