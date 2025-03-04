import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DispatchComponent } from './dispatch.component';

import { DispatchListComponent } from './dispatch-list/dispatch-list.component';
import { DispatchOrderComponent } from './dispatch-order/dispatch-order.component';
import { DispatchOrderDetailComponent } from './dispatch-order-detail/dispatch-order-detail.component';


const routes: Routes = [
  {
    path: '', component: DispatchComponent,
    children: [
      { path: '', component: DispatchListComponent },
      { path: 'order', component: DispatchOrderComponent },
      { path: 'order-detail', component: DispatchOrderDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispatchRoutingModule { }
