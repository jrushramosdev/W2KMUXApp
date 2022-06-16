import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PpvMatchComponent } from './ppv-match.component';

const routes: Routes = [
  { path: '', component: PpvMatchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PpvMatchRoutingModule { }
