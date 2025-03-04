import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelPrinterComponent } from './label-printer.component';

const routes: Routes = [{ path: '', component: LabelPrinterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabelPrinterRoutingModule { }
