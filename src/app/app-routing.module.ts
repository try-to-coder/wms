import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'organization', loadChildren: () => import('./pages/organization/organization.module').then(m => m.OrganizationModule) },
  { path: 'material-master', loadChildren: () => import('./pages/material-master/material-master.module').then(m => m.MaterialMasterModule) },
  { path: 'employee-master', loadChildren: () => import('./pages/employee-master/employee-master.module').then(m => m.EmployeeMasterModule) },
  { path: 'warehouse-master', loadChildren: () => import('./pages/warehouse-master/warehouse-master.module').then(m => m.WarehouseMasterModule) },
  { path: 'label-printer', loadChildren: () => import('./pages/label-printer/label-printer.module').then(m => m.LabelPrinterModule) },
  { path: 'tax-master', loadChildren: () => import('./pages/tax-master/tax-master.module').then(m => m.TaxMasterModule) },
  { path: 'grn', loadChildren: () => import('./pages/grn/grn.module').then(m => m.GrnModule) },
  { path: 'material-attributes', loadChildren: () => import('./pages/material-attributes/material-attributes.module').then(m => m.MaterialAttributesModule) },
  { path: 'rack-master', loadChildren: () => import('./pages/rack-master/rack-master.module').then(m => m.RackMasterModule) },
  { path: 'picking', loadChildren: () => import('./pages/picking/picking.module').then(m => m.PickingModule) },
  { path: 'putaway', loadChildren: () => import('./pages/putaway/putaway.module').then(m => m.PutawayModule) },
  { path: 'dispatch', loadChildren: () => import('./pages/dispatch/dispatch.module').then(m => m.DispatchModule) },
  { path: 'inventory', loadChildren: () => import('./pages/inventory/inventory.module').then(m => m.InventoryModule) },
  { path: 'cargo-inward', loadChildren: () => import('./pages/cargo-inward/cargo-inward.module').then(m => m.CargoInwardModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true }), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
