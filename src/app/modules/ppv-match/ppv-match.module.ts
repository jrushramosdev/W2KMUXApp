import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PpvMatchRoutingModule } from './ppv-match-routing.module';
import { PpvMatchComponent } from './ppv-match.component';
import { MaterialModule } from '../../shared/components/material/material.module';


@NgModule({
  declarations: [
    PpvMatchComponent
  ],
  imports: [
    CommonModule,
    PpvMatchRoutingModule,
    MaterialModule
  ]
})
export class PpvMatchModule { }
