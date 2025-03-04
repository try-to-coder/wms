import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PickListDetailComponent } from './pick-list-detail/pick-list-detail.component';
import { PickListComponent } from './pick-list/pick-list.component';
import { PickOrderDetailComponent } from './pick-order-detail/pick-order-detail.component';
import { PickOrderImportComponent } from './pick-order-import/pick-order-import.component';
import { PickingComponent } from './picking.component';

const routes: Routes = [
  {
    path: '', component: PickingComponent,
    children: [
      { path: '', component: PickListComponent },
      { path: 'detail', component: PickOrderDetailComponent },
      { path: 'import', component: PickOrderImportComponent },
      { path: 'list-detail', component: PickListDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PickingRoutingModule { }
