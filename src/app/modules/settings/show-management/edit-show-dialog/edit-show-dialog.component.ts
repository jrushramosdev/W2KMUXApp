import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowManagementService } from '../../../../shared/services/show-management.service';
import { ResponseDialogService } from '../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { UpdateShowManagement } from '../../../../models/show-management';

@Component({
  selector: 'app-edit-show-dialog',
  templateUrl: './edit-show-dialog.component.html',
  styleUrls: ['./edit-show-dialog.component.scss']
})
export class EditShowDialogComponent implements OnInit {
  updateShowManagement!: UpdateShowManagement;
  hasChange: boolean = false;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_showid: new FormControl(""),
    ctrl_showname: new FormControl("", Validators.required),
    ctrl_showorder: new FormControl("", Validators.required),
    ctrl_isactive: new FormControl("", Validators.required)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public matdata: any,
    public dialog: MatDialog,
    private dialogref: MatDialogRef<EditShowDialogComponent>,
    private service: ShowManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.getShowManagement();
  }

  getShowManagement() {
    if (this.matdata.id != undefined) {
      this.ngxSpinnerService.start("LOADING");

      this.service.getShow(this.matdata.id).subscribe(
        (result: any) => {
          this.updateShowManagement = result;
          this.patchShowManagementData();
          this.ngxSpinnerService.stop();
        }, error => {
          this.ngxSpinnerService.stop();
          this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
          this.dialogref.close();
        }
      );
    }
  }

  patchShowManagementData() {
    this.formGroup.patchValue({
      ctrl_showid: this.updateShowManagement.showId,
      ctrl_showname: this.updateShowManagement.showName,
      ctrl_showorder: this.updateShowManagement.showOrder,
      ctrl_isactive: this.updateShowManagement.isActive
    });  

    this.onCreateGroupFormValueChange();
  }

  onCreateGroupFormValueChange(){
    const initialValue = this.formGroup.value;
    this.formGroup.valueChanges.subscribe(value => {
      this.hasChange = Object.keys(initialValue).some(key => this.formGroup.value[key] != initialValue[key])
    });
  }

  onSubmit() {
    if (this.hasChange == true) {
      if (this.formGroup.valid) {
        this.ngxSpinnerService.start("SAVING");

        this.service.updateShow(this.updateShowManagementData()).subscribe(
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
    else {
      this.snackbarService.openSnackBar("No changes found, Couldn't update the data", "close");
    }
  }

  updateShowManagementData(): UpdateShowManagement {
    return this.updateShowManagement = {
      showId: this.formGroup.value['ctrl_showid'],
      showName: this.formGroup.value['ctrl_showname'],
      showOrder: this.formGroup.value['ctrl_showorder'],
      isActive: this.formGroup.value['ctrl_isactive']
    };
  }
}
