import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamHistoryComponent } from './team-history.component';

const routes: Routes = [
  { path: '', component: TeamHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamHistoryRoutingModule { }
