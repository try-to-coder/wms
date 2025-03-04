import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RackMasterComponent } from './rack-master.component';

const routes: Routes = [{ path: '', component: RackMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RackMasterRoutingModule { }
