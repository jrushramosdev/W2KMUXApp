import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperstarsRoutingModule } from './superstars-routing.module';
import { SuperstarsComponent } from './superstars.component';
import { AddSuperstarsDialogComponent } from './add-superstars-dialog/add-superstars-dialog.component';
import { EditSuperstarsDialogComponent } from './edit-superstars-dialog/edit-superstars-dialog.component';
import { MaterialModule } from '../../shared/components/material/material.module';


@NgModule({
  declarations: [
    SuperstarsComponent,
    AddSuperstarsDialogComponent,
    EditSuperstarsDialogComponent
  ],
  imports: [
    CommonModule,
    SuperstarsRoutingModule,
    MaterialModule
  ]
})
export class SuperstarsModule { }
