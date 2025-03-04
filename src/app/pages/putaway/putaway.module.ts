import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PutawayRoutingModule } from './putaway-routing.module';
import { PutawayComponent } from './putaway.component';
import { PutAwayListComponent } from './put-away-list/put-away-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PutAwayDetailComponent } from './put-away-detail/put-away-detail.component';
import { PutAwayGenerationComponent } from './put-away-generation/put-away-generation.component';
import { PutAwayModalComponent } from './put-away-modal/put-away-modal.component';


@NgModule({
  declarations: [
    PutawayComponent,
    PutAwayListComponent,
    PutAwayDetailComponent,
    PutAwayGenerationComponent,
    PutAwayModalComponent
  ],
  imports: [
    CommonModule,
    PutawayRoutingModule,
    DataTablesModule,
    FormsModule,
    SharedModule
  ]
})
export class PutawayModule { }
