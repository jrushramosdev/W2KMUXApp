import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampionshipManagementRoutingModule } from './championship-management-routing.module';
import { ChampionshipManagementComponent } from './championship-management.component';
import { AddChampionshipDialogComponent } from './add-championship-dialog/add-championship-dialog.component';
import { EditChampionshipDialogComponent } from './edit-championship-dialog/edit-championship-dialog.component';
import { MaterialModule } from '../../../shared/components/material/material.module';


@NgModule({
  declarations: [
    ChampionshipManagementComponent,
    AddChampionshipDialogComponent,
    EditChampionshipDialogComponent
  ],
  imports: [
    CommonModule,
    ChampionshipManagementRoutingModule,
    MaterialModule
  ]
})
export class ChampionshipManagementModule { }
