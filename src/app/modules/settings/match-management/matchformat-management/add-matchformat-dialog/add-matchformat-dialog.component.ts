import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatchManagementService } from 'src/app/shared/services/match-management.service';
import { ResponseDialogService } from '../../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { AddMatchFormatManagement, MatchTypeManagement } from '../../../../../models/match-management';

@Component({
  selector: 'app-add-matchformat-dialog',
  templateUrl: './add-matchformat-dialog.component.html',
  styleUrls: ['./add-matchformat-dialog.component.scss']
})
export class AddMatchformatDialogComponent implements OnInit {
  addMatchFormatManagement!: AddMatchFormatManagement;
  matchTypeData: MatchTypeManagement[] = [];
  handicap: boolean = false;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_matchformatname: new FormControl("", Validators.required),
    ctrl_matchtypeid: new FormControl("", Validators.required),
    ctrl_teamscount: new FormControl(2, Validators.required),
    ctrl_participantcount: new FormControl(1, Validators.required),
    ctrl_handicapcount: new FormControl(0, Validators.required)
  });

  constructor(
    public dialog: MatDialog,
    private dialogref: MatDialogRef<AddMatchformatDialogComponent>,
    private service: MatchManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.getMatchTypeList();
  }

  getMatchTypeList() {
    this.ngxSpinnerService.start("LOADING");

    this.service.getMatchTypeList().subscribe(
      (result: any) => {
        this.matchTypeData = result;
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

      this.service.addMatchFormat(this.addMatchFormatManagementData()).subscribe(
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

  addMatchFormatManagementData(): AddMatchFormatManagement {
    return this.addMatchFormatManagement = {
      matchFormatName: this.formGroup.value['ctrl_matchformatname'],
      matchTypeId: this.formGroup.value['ctrl_matchtypeid'],
      teamsCount: this.formGroup.value['ctrl_teamscount'],
      participantCount: this.formGroup.value['ctrl_participantcount'],
      handicapCount: this.formGroup.value['ctrl_handicapcount']
    };
  }

  changeMatchType(matchTypeName : string) {
    if (matchTypeName == "Handicap") {
      this.handicap = true;
    }
    else
    {
      this.handicap = false;
      this.formGroup.patchValue({ctrl_handicapcount: 0})
    }
  }

}
