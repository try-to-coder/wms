import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PutAwayDetailComponent } from './put-away-detail/put-away-detail.component';
import { PutAwayGenerationComponent } from './put-away-generation/put-away-generation.component';
import { PutAwayListComponent } from './put-away-list/put-away-list.component';
import { PutawayComponent } from './putaway.component';

const routes: Routes = [
  {
    path: '', component: PutawayComponent,
    children: [
      { path: '', component: PutAwayListComponent },
      { path: 'detail', component: PutAwayDetailComponent },
      { path: 'create', component: PutAwayGenerationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PutawayRoutingModule { }
