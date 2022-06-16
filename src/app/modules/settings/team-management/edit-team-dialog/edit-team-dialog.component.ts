import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamManagementService } from '../../../../shared/services/team-management.service';
import { ResponseDialogService } from '../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { UpdateTeamManagement } from '../../../../models/team-management';

@Component({
  selector: 'app-edit-team-dialog',
  templateUrl: './edit-team-dialog.component.html',
  styleUrls: ['./edit-team-dialog.component.scss']
})
export class EditTeamDialogComponent implements OnInit {
  updateTeamManagement!: UpdateTeamManagement;
  hasChange: boolean = false;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_teamid: new FormControl(""),
    ctrl_teamname: new FormControl("", Validators.required),
    ctrl_isactive: new FormControl("", Validators.required)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public matdata: any,
    public dialog: MatDialog,
    private dialogref: MatDialogRef<EditTeamDialogComponent>,
    private service: TeamManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getTeamManagementList();
  }

  getTeamManagementList() {
    if (this.matdata.id != undefined) {
      this.ngxSpinnerService.start("LOADING");

      this.service.getTeam(this.matdata.id).subscribe(
        (result: any) => {
          this.updateTeamManagement = result;
          this.patchTeamManagementData();
          this.ngxSpinnerService.stop();
        }, error => {
          if (error.status == 0) {this.snackbarService.openSnackBar("Network Error, The network connection is lost", "close");}
          else {
            if (error.error.ErrorMessage == undefined || error.error.ErrorMessage == "") {this.snackbarService.openSnackBar(error.error, "close");}
            else {this.snackbarService.openSnackBar(error.error.ErrorMessage, "close");}}
          this.dialogref.close();
        }
      );
    }
  }

  patchTeamManagementData() {
    this.formGroup.patchValue({
      ctrl_teamid: this.updateTeamManagement.teamId,
      ctrl_teamname: this.updateTeamManagement.teamName,
      ctrl_isactive: this.updateTeamManagement.isActive
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
  
        this.service.updateTeam(this.updateTeamManagementData()).subscribe(
          (result: any) => {
            this.ngxSpinnerService.stop();
            this.responseDialogService.start("SUCCESS", result);
            this.formGroup.reset();
            this.dialogref.close('success');
          }, error => {
            this.ngxSpinnerService.stop();
            if (error.status == 0) {this.snackbarService.openSnackBar("Network Error, The network connection is lost", "close");}
            else {
              if (error.error.ErrorMessage == undefined || error.error.ErrorMessage == "") {this.snackbarService.openSnackBar(error.error, "close");}
              else {this.snackbarService.openSnackBar(error.error.ErrorMessage, "close");}}
            this.dialogref.close();
          }
        );
      }
    }
    else {
      this.snackbarService.openSnackBar("No changes found, Couldn't update the data", "close");
    }
  }

  updateTeamManagementData(): UpdateTeamManagement {
    return this.updateTeamManagement = {
      teamId: this.formGroup.value['ctrl_teamid'],
      teamName: this.formGroup.value['ctrl_teamname'],
      isActive: this.formGroup.value['ctrl_isactive']
    };
  }

}
