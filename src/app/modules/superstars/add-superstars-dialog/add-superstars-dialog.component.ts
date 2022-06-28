import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShowManagementService } from '../../../shared/services/show-management.service';
import { TeamManagementService } from '../../../shared/services/team-management.service';
import { SuperstarsService } from '../../../shared/services/superstars.service';
import { ResponseDialogService } from '../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { AddSuperstars } from '../../../models/superstars';

@Component({
  selector: 'app-add-superstars-dialog',
  templateUrl: './add-superstars-dialog.component.html',
  styleUrls: ['./add-superstars-dialog.component.scss']
})
export class AddSuperstarsDialogComponent implements OnInit {
  addSuperstars!: AddSuperstars;
  showData: any;
  teamData: any;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_superstarname: new FormControl("", Validators.required),
    ctrl_gender: new FormControl("", Validators.required),
    ctrl_role: new FormControl("", Validators.required),
    ctrl_teamid: new FormControl(""),
    ctrl_showid: new FormControl(""),
    ctrl_isinjured: new FormControl(false, Validators.required),
    ctrl_isactive: new FormControl(true, Validators.required)
  });

  constructor(
    public dialog: MatDialog,
    private dialogref: MatDialogRef<AddSuperstarsDialogComponent>,
    private showservice: ShowManagementService,
    private teamservice: TeamManagementService,
    private superstarsservice: SuperstarsService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.gatherData();
  }

  gatherData() {
    this.getShowList();
    this.getTeamList();
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

  getTeamList() {
    this.ngxSpinnerService.start("LOADING");

    this.teamservice.getTeamList().subscribe(
      (result: any) => {
        this.teamData = result;
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

      this.superstarsservice.addSuperstar(this.addSuperstarsData()).subscribe(
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

  addSuperstarsData(): AddSuperstars {
    return this.addSuperstars = {
      superstarName: this.formGroup.value['ctrl_superstarname'],
      gender: this.formGroup.value['ctrl_gender'],
      role: this.formGroup.value['ctrl_role'],
      teamId: this.formGroup.value['ctrl_teamid'] == '' ? null : this.formGroup.value['ctrl_teamid'],
      showId: this.formGroup.value['ctrl_showid'] == '' ? null : this.formGroup.value['ctrl_showid'],
      isInjured: this.formGroup.value['ctrl_isinjured'],
      isActive: this.formGroup.value['ctrl_isactive']
    };
  }

}
