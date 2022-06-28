import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatchManagementService } from 'src/app/shared/services/match-management.service';
import { ResponseDialogService } from '../../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { UpdateMatchTypeManagement } from '../../../../../models/match-management';

@Component({
  selector: 'app-edit-matchtype-dialog',
  templateUrl: './edit-matchtype-dialog.component.html',
  styleUrls: ['./edit-matchtype-dialog.component.scss']
})
export class EditMatchtypeDialogComponent implements OnInit {
  updateMatchTypeManagement!: UpdateMatchTypeManagement;
  hasChange: boolean = false;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_matchtypeid: new FormControl(""),
    ctrl_matchtypename: new FormControl("", Validators.required),
    ctrl_matchtypeorder: new FormControl(0, Validators.required)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public matdata: any,
    public dialog: MatDialog,
    private dialogref: MatDialogRef<EditMatchtypeDialogComponent>,
    private service: MatchManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.getMatchTypeManagementList();
  }

  getMatchTypeManagementList() {
    if (this.matdata.id != undefined) {
      this.ngxSpinnerService.start("LOADING");

      this.service.getMatchType(this.matdata.id).subscribe(
        (result: any) => {
          this.updateMatchTypeManagement = result;
          this.patchMatchTypeManagementData();
          this.ngxSpinnerService.stop();
        }, error => {
          this.ngxSpinnerService.stop();
          this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
          this.dialogref.close();
        }
      );
    }
  }

  patchMatchTypeManagementData() {
    this.formGroup.patchValue({
      ctrl_matchtypeid: this.updateMatchTypeManagement.matchTypeId,
      ctrl_matchtypename: this.updateMatchTypeManagement.matchTypeName,
      ctrl_matchtypeorder: this.updateMatchTypeManagement.matchTypeOrder
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
  
        this.service.updateMatchType(this.updateMatchTypeManagementData()).subscribe(
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

  updateMatchTypeManagementData(): UpdateMatchTypeManagement {
    return this.updateMatchTypeManagement = {
      matchTypeId: this.formGroup.value['ctrl_matchtypeid'],
      matchTypeName: this.formGroup.value['ctrl_matchtypename'],
      matchTypeOrder: this.formGroup.value['ctrl_matchtypeorder']
    };
  }

}
