import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamManagementRoutingModule } from './team-management-routing.module';
import { TeamManagementComponent } from './team-management.component';
import { AddTeamDialogComponent } from './add-team-dialog/add-team-dialog.component';
import { EditTeamDialogComponent } from './edit-team-dialog/edit-team-dialog.component';
import { MaterialModule } from '../../../shared/components/material/material.module';

@NgModule({
  declarations: [
    TeamManagementComponent,
    AddTeamDialogComponent,
    EditTeamDialogComponent
  ],
  imports: [
    CommonModule,
    TeamManagementRoutingModule,
    MaterialModule
  ]
})
export class TeamManagementModule { }
