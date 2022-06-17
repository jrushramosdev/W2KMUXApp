import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionshiptypeManagementComponent } from './championshiptype-management.component';

const routes: Routes = [
  { path: '' , component: ChampionshiptypeManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChampionshiptypeManagementRoutingModule { }
