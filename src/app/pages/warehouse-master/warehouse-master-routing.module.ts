import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseMasterComponent } from './warehouse-master.component';

const routes: Routes = [{ path: '', component: WarehouseMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseMasterRoutingModule { }
