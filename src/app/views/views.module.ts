import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsRoutingModule } from './views-routing.modules';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ContentComponent } from './layouts/content/content.component';
import { MainContentComponent } from './maincontent/maincontent.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MaterialModule } from '../shared/components/material/material.module';
import { ResponseDialogComponent } from '../shared/components/response-dialog/response-dialog.component';
import { NgxSpinnerComponent } from '../shared/components/ngx-spinner/ngx-spinner.component';

@NgModule({
  declarations: [
    SidebarComponent,
    ContentComponent,
    MainContentComponent,
    FooterComponent,
    ResponseDialogComponent,
    NgxSpinnerComponent,
  ],
  entryComponents: [
    ResponseDialogComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    MaterialModule
  ],
  providers: [NgxSpinnerComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ViewsModule { }
