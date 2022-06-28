import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatchManagementService } from 'src/app/shared/services/match-management.service';
import { ResponseDialogService } from '../../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { UpdateMatchFormatManagement, MatchTypeManagement } from '../../../../../models/match-management';

@Component({
  selector: 'app-edit-matchformat-dialog',
  templateUrl: './edit-matchformat-dialog.component.html',
  styleUrls: ['./edit-matchformat-dialog.component.scss']
})
export class EditMatchformatDialogComponent implements OnInit {
  updateMatchFormatManagement!: UpdateMatchFormatManagement;
  matchTypeData: MatchTypeManagement[] = [];
  handicap: boolean = false;
  hasChange: boolean = false;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_matchformatid: new FormControl(""),
    ctrl_matchformatname: new FormControl("", Validators.required),
    ctrl_matchtypeid: new FormControl("", Validators.required),
    ctrl_teamscount: new FormControl(2, Validators.required),
    ctrl_participantcount: new FormControl(1, Validators.required),
    ctrl_handicapcount: new FormControl(0, Validators.required),
    ctrl_matchformatorder: new FormControl(1, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public matdata: any,
    public dialog: MatDialog,
    private dialogref: MatDialogRef<EditMatchformatDialogComponent>,
    private service: MatchManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.gatherData();
  }

  gatherData() {
    this.getMatchTypeList();
    this.getMatchFormatManagementList();
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

  getMatchFormatManagementList() {
    if (this.matdata.id != undefined) {
      this.ngxSpinnerService.start("LOADING");

      this.service.getMatchFormat(this.matdata.id).subscribe(
        (result: any) => {
          this.updateMatchFormatManagement = result;
          this.patchMatchFormatManagementData();
          this.ngxSpinnerService.stop();
        }, error => {
          this.ngxSpinnerService.stop();
          this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
          this.dialogref.close();
        }
      );
    }
  }

  patchMatchFormatManagementData() {
    this.formGroup.patchValue({
      ctrl_matchformatid: this.updateMatchFormatManagement.matchFormatId,
      ctrl_matchformatname: this.updateMatchFormatManagement.matchFormatName,
      ctrl_matchtypeid: this.updateMatchFormatManagement.matchTypeId,
      ctrl_teamscount: this.updateMatchFormatManagement.teamsCount,
      ctrl_participantcount: this.updateMatchFormatManagement.participantCount,
      ctrl_handicapcount: this.updateMatchFormatManagement.handicapCount,
      ctrl_matchformatorder: this.updateMatchFormatManagement.matchFormatOrder
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
  
        this.service.updateMatchFormat(this.updateMatchFormatManagementData()).subscribe(
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

  updateMatchFormatManagementData(): UpdateMatchFormatManagement {
    return this.updateMatchFormatManagement = {
      matchFormatId: this.formGroup.value['ctrl_matchformatid'],
      matchFormatName: this.formGroup.value['ctrl_matchformatname'],
      matchTypeId: this.formGroup.value['ctrl_matchtypeid'],
      teamsCount: this.formGroup.value['ctrl_teamscount'],
      handicapCount: this.formGroup.value['ctrl_handicapcount'],
      participantCount: this.formGroup.value['ctrl_participantcount'],
      matchFormatOrder: this.formGroup.value['ctrl_matchformatorder']
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
