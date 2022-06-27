import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PpvListComponent } from './ppv-list/ppv-list.component';
import { MaterialModule } from 'src/app/shared/components/material/material.module';


@NgModule({
  declarations: [
    PpvListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports:
  [
    CommonModule,
    PpvListComponent
  ]
})
export class WidgetsModule { }
