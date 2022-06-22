import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampionHistoryRoutingModule } from './champion-history-routing.module';
import { ChampionHistoryComponent } from './champion-history.component';
import { MaterialModule } from 'src/app/shared/components/material/material.module';


@NgModule({
  declarations: [
    ChampionHistoryComponent
  ],
  imports: [
    CommonModule,
    ChampionHistoryRoutingModule,
    MaterialModule
  ]
})
export class ChampionHistoryModule { }
