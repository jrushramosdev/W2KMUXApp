import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamHistoryRoutingModule } from './team-history-routing.module';
import { TeamHistoryComponent } from './team-history.component';
import { MaterialModule } from '../../shared/components/material/material.module';


@NgModule({
  declarations: [
    TeamHistoryComponent
  ],
  imports: [
    CommonModule,
    TeamHistoryRoutingModule,
    MaterialModule
  ]
})
export class TeamHistoryModule { }
