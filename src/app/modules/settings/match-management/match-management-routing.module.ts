import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchManagementComponent } from './match-management.component';

const routes: Routes = [
  { path: '', component: MatchManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchManagementRoutingModule { }
