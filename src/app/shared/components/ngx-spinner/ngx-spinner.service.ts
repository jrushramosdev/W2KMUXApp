import { Injectable } from '@angular/core';
import { NgxSpinnerComponent } from './ngx-spinner.component';

@Injectable({
  providedIn: 'root'
})
export class NgxSpinnerService {

  constructor(private spinnerComponent: NgxSpinnerComponent) { }

  start(loadingtype: string) {
    this.spinnerComponent.onSpinnerStart(loadingtype);
  }

  stop() {
    this.spinnerComponent.onSpinnerStop();
  }
}
