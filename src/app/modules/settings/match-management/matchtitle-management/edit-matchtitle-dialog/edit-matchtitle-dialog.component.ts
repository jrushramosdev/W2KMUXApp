import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatchManagementService } from 'src/app/shared/services/match-management.service';
import { ResponseDialogService } from '../../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { UpdateMatchTitleManagement } from '../../../../../models/match-management';

@Component({
  selector: 'app-edit-matchtitle-dialog',
  templateUrl: './edit-matchtitle-dialog.component.html',
  styleUrls: ['./edit-matchtitle-dialog.component.scss']
})
export class EditMatchtitleDialogComponent implements OnInit {
  updateMatchTitleManagement!: UpdateMatchTitleManagement;
  handicap: boolean = false;
  hasChange: boolean = false;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_matchtitleid: new FormControl(""),
    ctrl_matchtitlename: new FormControl("", Validators.required),
    ctrl_matchtitleorder: new FormControl(1, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public matdata: any,
    public dialog: MatDialog,
    private dialogref: MatDialogRef<EditMatchtitleDialogComponent>,
    private service: MatchManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.getMatchTitleManagementList();
  }

  getMatchTitleManagementList() {
    if (this.matdata.id != undefined) {
      this.ngxSpinnerService.start("LOADING");

      this.service.getMatchTitle(this.matdata.id).subscribe(
        (result: any) => {
          this.updateMatchTitleManagement = result;
          this.patchMatchTitleManagementData();
          this.ngxSpinnerService.stop();
        }, error => {
          this.ngxSpinnerService.stop();
          this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
          this.dialogref.close();
        }
      );
    }
  }

  patchMatchTitleManagementData() {
    this.formGroup.patchValue({
      ctrl_matchtitleid: this.updateMatchTitleManagement.matchTitleId,
      ctrl_matchtitlename: this.updateMatchTitleManagement.matchTitleName,
      ctrl_matchtitleorder: this.updateMatchTitleManagement.matchTitleOrder
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
  
        this.service.updateMatchTitle(this.updateMatchTitleManagementData()).subscribe(
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

  updateMatchTitleManagementData(): UpdateMatchTitleManagement {
    return this.updateMatchTitleManagement = {
      matchTitleId: this.formGroup.value['ctrl_matchtitleid'],
      matchTitleName: this.formGroup.value['ctrl_matchtitlename'],
      matchTitleOrder: this.formGroup.value['ctrl_matchtitleorder']
    };
  }

}
