import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialAttributesComponent } from './material-attributes.component';

const routes: Routes = [{ path: '', component: MaterialAttributesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialAttributesRoutingModule { }
