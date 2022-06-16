import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowManagementRoutingModule } from './show-management-routing.module';
import { ShowManagementComponent } from './show-management.component';
import { AddShowDialogComponent } from './add-show-dialog/add-show-dialog.component';
import { EditShowDialogComponent } from './edit-show-dialog/edit-show-dialog.component';
import { MaterialModule } from '../../../shared/components/material/material.module';

@NgModule({
  declarations: [
    ShowManagementComponent,
    AddShowDialogComponent,
    EditShowDialogComponent
  ],
  imports: [
    CommonModule,
    ShowManagementRoutingModule,
    MaterialModule
  ]
})
export class ShowManagementModule { }
