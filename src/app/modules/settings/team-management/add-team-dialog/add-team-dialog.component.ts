import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TeamManagementService } from '../../../../shared/services/team-management.service';
import { ResponseDialogService } from '../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { AddTeamManagement } from '../../../../models/team-management';

@Component({
  selector: 'app-add-team-dialog',
  templateUrl: './add-team-dialog.component.html',
  styleUrls: ['./add-team-dialog.component.scss']
})
export class AddTeamDialogComponent implements OnInit {
  addTeamManagement!: AddTeamManagement;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_teamname: new FormControl("", Validators.required)
  });

  constructor(
    public dialog: MatDialog,
    private dialogref: MatDialogRef<AddTeamDialogComponent>,
    private service: TeamManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.ngxSpinnerService.start("SAVING");

      this.service.addTeam(this.addTeamManagementData()).subscribe(
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

  addTeamManagementData(): AddTeamManagement {
    return this.addTeamManagement = {
      teamName: this.formGroup.value['ctrl_teamname']
    };
  }

}
