import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchManagementRoutingModule } from './match-management-routing.module';
import { MatchManagementComponent } from './match-management.component';
import { MaterialModule } from 'src/app/shared/components/material/material.module';
import { MatchformatManagementComponent } from './matchformat-management/matchformat-management.component';
import { MatchtypeManagementComponent } from './matchtype-management/matchtype-management.component';
import { MatchtitleManagementComponent } from './matchtitle-management/matchtitle-management.component';
import { AddMatchtypeDialogComponent } from './matchtype-management/add-matchtype-dialog/add-matchtype-dialog.component';
import { EditMatchtypeDialogComponent } from './matchtype-management/edit-matchtype-dialog/edit-matchtype-dialog.component';


@NgModule({
  declarations: [
    MatchManagementComponent,
    MatchformatManagementComponent,
    MatchtypeManagementComponent,
    MatchtitleManagementComponent,
    AddMatchtypeDialogComponent,
    EditMatchtypeDialogComponent
  ],
  imports: [
    CommonModule,
    MatchManagementRoutingModule,
    MaterialModule
  ]
})
export class MatchManagementModule { }
