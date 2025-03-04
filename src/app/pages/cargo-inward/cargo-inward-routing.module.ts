import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargoInwardComponent } from './cargo-inward.component';
import { CargoOutwardScanComponent } from './cargo-outward-scan/cargo-outward-scan.component';
import { ManualInwardImportComponent } from './manual-inward-import/manual-inward-import.component';
import { ManualInwardListComponent } from './manual-inward-list/manual-inward-list.component';
import { ManualInwardScanComponent } from './manual-inward-scan/manual-inward-scan.component';

const routes: Routes = [
  {
    path: '', component: CargoInwardComponent,
    children: [
      { path: '', component: ManualInwardListComponent },
      { path: 'import', component: ManualInwardImportComponent },
      { path: 'scan', component: ManualInwardScanComponent },
      { path: 'outward', component: CargoOutwardScanComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargoInwardRoutingModule { }
