import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowManagementService } from '../../../shared/services/show-management.service';
import { TeamManagementService } from '../../../shared/services/team-management.service';
import { SuperstarsService } from '../../../shared/services/superstars.service';
import { ResponseDialogService } from '../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { UpdateSuperstars } from '../../../models/superstars';

@Component({
  selector: 'app-edit-superstars-dialog',
  templateUrl: './edit-superstars-dialog.component.html',
  styleUrls: ['./edit-superstars-dialog.component.scss']
})
export class EditSuperstarsDialogComponent implements OnInit {
  updateSuperstars!: UpdateSuperstars;
  showData: any;
  teamData: any;
  hasChange: boolean = false;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_superstarid: new FormControl("", Validators.required),
    ctrl_superstarname: new FormControl("", Validators.required),
    ctrl_gender: new FormControl("", Validators.required),
    ctrl_role: new FormControl("", Validators.required),
    ctrl_teamid: new FormControl(""),
    ctrl_showid: new FormControl(""),
    ctrl_isinjured: new FormControl(false, Validators.required),
    ctrl_isactive: new FormControl(true, Validators.required)
  });
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public matdata: any,
    public dialog: MatDialog,
    private dialogref: MatDialogRef<EditSuperstarsDialogComponent>,
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
    this.getSuperstarsList();
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

  getSuperstarsList() {
    if (this.matdata.id != undefined) {
      this.ngxSpinnerService.start("LOADING");

      this.superstarsservice.getSuperstar(this.matdata.id).subscribe(
        (result: any) => {
          this.updateSuperstars = result;
          this.patchSuperstarData();
          this.ngxSpinnerService.stop();
        }, error => {
          this.ngxSpinnerService.stop();
          this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
          this.dialogref.close();
        }
      );
    }
  }

  patchSuperstarData() {
    this.formGroup.patchValue({
      ctrl_superstarid: this.updateSuperstars.superstarId,
      ctrl_superstarname: this.updateSuperstars.superstarName,
      ctrl_gender: this.updateSuperstars.gender,
      ctrl_role: this.updateSuperstars.role,
      ctrl_teamid: this.updateSuperstars.teamId == null? "" : this.updateSuperstars.teamId,
      ctrl_showid: this.updateSuperstars.showId == null? "" : this.updateSuperstars.showId,
      ctrl_isinjured: this.updateSuperstars.isInjured,
      ctrl_isactive: this.updateSuperstars.isActive
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
  
        this.superstarsservice.updateSuperstar(this.updateSuperstarData()).subscribe(
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

  updateSuperstarData(): UpdateSuperstars {
    return this.updateSuperstars = {
      superstarId: this.formGroup.value['ctrl_superstarid'],
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
