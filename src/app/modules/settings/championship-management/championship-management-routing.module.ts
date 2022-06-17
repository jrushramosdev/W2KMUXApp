import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionshipManagementComponent } from './championship-management.component';

const routes: Routes = [
  { path: '', component: ChampionshipManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChampionshipManagementRoutingModule { }
