import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PpvManagementComponent } from './ppv-management.component';

const routes: Routes = [
  { path: '', component: PpvManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PpvManagementRoutingModule { }
