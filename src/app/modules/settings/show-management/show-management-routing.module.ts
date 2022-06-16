import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowManagementComponent } from './show-management.component';

const routes: Routes = [
  { path: '', component: ShowManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowManagementRoutingModule { }
