import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RosterRoutingModule } from './roster-routing.module';
import { RosterComponent } from './roster.component';
import { MaterialModule } from '../../shared/components/material/material.module';


@NgModule({
  declarations: [
    RosterComponent
  ],
  imports: [
    CommonModule,
    RosterRoutingModule,
    MaterialModule
  ]
})
export class RosterModule { }
