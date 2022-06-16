import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ngx-spinner',
  templateUrl: './ngx-spinner.component.html',
  styleUrls: ['./ngx-spinner.component.scss']
})
export class NgxSpinnerComponent implements OnInit {
  loadingtype: string = 'loading';

  constructor(
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onSpinnerStart(loadingtype: string) {
    this.loadingtype='loading'
    switch (loadingtype) {
      case "LOADING":
        this.loadingtype='loading'
        this.spinner.show('loading');
        break;
      case "SAVING":
        this.loadingtype='saving'
        this.spinner.show('saving');
        break;
      case "DELETING":
        this.loadingtype='delete'
        this.spinner.show('delete');
        break;
      default:
        break;
    }
  }

  onSpinnerStop() {
    this.spinner.hide(this.loadingtype);
  }
}
