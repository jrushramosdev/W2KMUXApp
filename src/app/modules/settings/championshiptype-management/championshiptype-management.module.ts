import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampionshiptypeManagementRoutingModule } from './championshiptype-management-routing.module';
import { ChampionshiptypeManagementComponent } from './championshiptype-management.component';
import { AddChampionshiptypeDialogComponent } from './add-championshiptype-dialog/add-championshiptype-dialog.component';
import { EditChampionshiptypeDialogComponent } from './edit-championshiptype-dialog/edit-championshiptype-dialog.component';


@NgModule({
  declarations: [
    ChampionshiptypeManagementComponent,
    AddChampionshiptypeDialogComponent,
    EditChampionshiptypeDialogComponent
  ],
  imports: [
    CommonModule,
    ChampionshiptypeManagementRoutingModule
  ]
})
export class ChampionshipTypeManagementModule { }
