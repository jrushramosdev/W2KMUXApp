import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { PPVManagementService } from '../../../shared/services/ppv-management.service';
import { ResponseDialogService } from '../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../shared/components/ngx-spinner/ngx-spinner.service';
import { PPVManagement } from '../../../models/ppv-management';

@Component({
  selector: 'app-ppv-list',
  templateUrl: './ppv-list.component.html',
  styleUrls: ['./ppv-list.component.scss']
})
export class PpvListComponent implements OnInit {
  @Input() ppvId = "default";
  @Input() ppvCount = 0;

  ppvManagement!: PPVManagement[];
  isNoRecord: boolean = true;
  ppvmatchCount: number = 1;

  constructor(
    private service: PPVManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getPPVManagementList();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ppvmatchCount = this.ppvCount;
  }

  onToggleFilter() {
    const dataList = [...this.ppvManagement]; // clone array
    var filteredData = dataList.filter((data: any) => data.isActive.toString() === "true");
    this.ppvManagement = filteredData;
  }

  getPPVManagementList() {
    this.ngxSpinnerService.start("LOADING");

    this.service.getPPVList().subscribe(
      (result: any) => {
        this.ppvManagement = result;
        this.onToggleFilter();
        this.isNoRecord = false;
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        if (error.status == 0) {this.snackbarService.openSnackBar("Network Error, The network connection is lost", "close");}
        else {
          if (error.error.ErrorMessage == undefined || error.error.ErrorMessage == "") {this.snackbarService.openSnackBar(error.error, "close");}
          else {this.snackbarService.openSnackBar(error.error.ErrorMessage, "close");}}
        this.isNoRecord = true;
      }
    );
  }

}
