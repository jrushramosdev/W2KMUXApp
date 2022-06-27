import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PpvMatchRoutingModule } from './ppv-match-routing.module';
import { PpvMatchComponent } from './ppv-match.component';
import { MaterialModule } from '../../shared/components/material/material.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { AddPpvmatchDialogComponent } from './add-ppvmatch-dialog/add-ppvmatch-dialog.component';


@NgModule({
  declarations: [
    PpvMatchComponent,
    AddPpvmatchDialogComponent
  ],
  imports: [
    CommonModule,
    PpvMatchRoutingModule,
    MaterialModule,
    WidgetsModule
  ]
})
export class PpvMatchModule { }
