import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShowManagementService } from '../../../../shared/services/show-management.service';
import { ResponseDialogService } from '../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { AddShowManagement } from '../../../../models/show-management';

@Component({
  selector: 'app-add-show-dialog',
  templateUrl: './add-show-dialog.component.html',
  styleUrls: ['./add-show-dialog.component.scss']
})
export class AddShowDialogComponent implements OnInit {
  addShowManagement!: AddShowManagement;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_showname: new FormControl("", Validators.required)
  });

  constructor( 
    public dialog: MatDialog,
    private dialogref: MatDialogRef<AddShowDialogComponent>,
    private service: ShowManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.ngxSpinnerService.start("SAVING");

      this.service.addShow(this.addShowManagementData()).subscribe(
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

  addShowManagementData(): AddShowManagement {
    return this.addShowManagement = {
      showName: this.formGroup.value['ctrl_showname']
    };
  }
}
