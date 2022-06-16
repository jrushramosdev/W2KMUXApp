import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PpvManagementRoutingModule } from './ppv-management-routing.module';
import { PpvManagementComponent } from './ppv-management.component';
import { AddPpvDialogComponent } from './add-ppv-dialog/add-ppv-dialog.component';
import { EditPpvDialogComponent } from './edit-ppv-dialog/edit-ppv-dialog.component';
import { MaterialModule } from '../../../shared/components/material/material.module';

@NgModule({
  declarations: [
    PpvManagementComponent,
    AddPpvDialogComponent,
    EditPpvDialogComponent
  ],
  imports: [
    CommonModule,
    PpvManagementRoutingModule,
    MaterialModule
  ]
})
export class PpvManagementModule { }
