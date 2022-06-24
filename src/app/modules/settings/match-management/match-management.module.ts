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
import { AddMatchformatDialogComponent } from './matchformat-management/add-matchformat-dialog/add-matchformat-dialog.component';
import { EditMatchformatDialogComponent } from './matchformat-management/edit-matchformat-dialog/edit-matchformat-dialog.component';
import { AddMatchtitleDialogComponent } from './matchtitle-management/add-matchtitle-dialog/add-matchtitle-dialog.component';
import { EditMatchtitleDialogComponent } from './matchtitle-management/edit-matchtitle-dialog/edit-matchtitle-dialog.component';


@NgModule({
  declarations: [
    MatchManagementComponent,
    MatchformatManagementComponent,
    MatchtypeManagementComponent,
    MatchtitleManagementComponent,
    AddMatchtypeDialogComponent,
    EditMatchtypeDialogComponent,
    AddMatchformatDialogComponent,
    EditMatchformatDialogComponent,
    AddMatchtitleDialogComponent,
    EditMatchtitleDialogComponent
  ],
  imports: [
    CommonModule,
    MatchManagementRoutingModule,
    MaterialModule
  ]
})
export class MatchManagementModule { }
