import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShowManagementService } from '../../../../shared/services/show-management.service';
import { PPVManagementService } from '../../../../shared/services/ppv-management.service';
import { ResponseDialogService } from '../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { AddPPVManagement } from '../../../../models/ppv-management';

@Component({
  selector: 'app-add-ppv-dialog',
  templateUrl: './add-ppv-dialog.component.html',
  styleUrls: ['./add-ppv-dialog.component.scss']
})
export class AddPpvDialogComponent implements OnInit {
  addPPVManagement!: AddPPVManagement;
  showData: any;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_ppvname: new FormControl("", Validators.required),
    ctrl_ppvmonth: new FormControl(1, Validators.required),
    ctrl_showid: new FormControl("", Validators.required)
  });

  constructor(
    public dialog: MatDialog,
    private dialogref: MatDialogRef<AddPpvDialogComponent>,
    private showservice: ShowManagementService,
    private ppvservice: PPVManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.getShowList();
  }

  getShowList() {
    this.ngxSpinnerService.start("LOADING");

    this.showservice.getShowList().subscribe(
      (result: any) => {
        this.showData = result;
        this.showData = this.showData.filter((data: any) => data.isActive == true); // I can use this to avoid filtering using input filter
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
        this.dialogref.close();
      }
    );
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.ngxSpinnerService.start("SAVING");

      this.ppvservice.addPPV(this.addPPVManagementData()).subscribe(
        (result: any) => {
          this.ngxSpinnerService.stop();
          this.responseDialogService.start("SUCCESS", result);
          this.formGroup.reset();
          this.dialogref.close('success');
        }, error => {
          this.ngxSpinnerService.stop();
          this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
        }
      );
    }
  }

  addPPVManagementData(): AddPPVManagement {
    return this.addPPVManagement = {
      ppvName: this.formGroup.value['ctrl_ppvname'],
      ppvMonth: this.formGroup.value['ctrl_ppvmonth'],
      showId: this.formGroup.value['ctrl_showid']
    };
  }
}
