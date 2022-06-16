import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperstarsComponent } from './superstars.component';

const routes: Routes = [
  { path: '', component: SuperstarsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperstarsRoutingModule { }
