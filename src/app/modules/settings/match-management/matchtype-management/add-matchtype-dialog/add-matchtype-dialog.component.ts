import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatchManagementService } from 'src/app/shared/services/match-management.service';
import { ResponseDialogService } from '../../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { AddMatchTypeManagement } from '../../../../../models/match-management';

@Component({
  selector: 'app-add-matchtype-dialog',
  templateUrl: './add-matchtype-dialog.component.html',
  styleUrls: ['./add-matchtype-dialog.component.scss']
})
export class AddMatchtypeDialogComponent implements OnInit {
  addMatchTypeManagement!: AddMatchTypeManagement;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_matchtypename: new FormControl("", Validators.required)
  });

  constructor(
    public dialog: MatDialog,
    private dialogref: MatDialogRef<AddMatchtypeDialogComponent>,
    private service: MatchManagementService,
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

      this.service.addMatchType(this.addMatchTypeManagementData()).subscribe(
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

  addMatchTypeManagementData(): AddMatchTypeManagement {
    return this.addMatchTypeManagement = {
      matchTypeName: this.formGroup.value['ctrl_matchtypename']
    };
  }

}
