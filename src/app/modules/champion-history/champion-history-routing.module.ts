import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionHistoryComponent } from './champion-history.component'

const routes: Routes = [
  { path: '', component: ChampionHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChampionHistoryRoutingModule { }
