import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ShowManagementService } from '../../../../shared/services/show-management.service';
import { SuperstarsService } from '../../../../shared/services/superstars.service';
import { ChampionshipManagementService } from '../../../../shared/services/championship-management.service';
import { ResponseDialogService } from '../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { AddChampionshipManagement } from '../../../../models/championship-management';

@Component({
  selector: 'app-add-championship-dialog',
  templateUrl: './add-championship-dialog.component.html',
  styleUrls: ['./add-championship-dialog.component.scss']
})
export class AddChampionshipDialogComponent implements OnInit {
  addChampionshipManagement!: AddChampionshipManagement;
  championshiptypeData: any;
  superstarData: any;
  showData: any;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_championshipname: new FormControl("", Validators.required),
    ctrl_championshiptypeid: new FormControl("", Validators.required),
    ctrl_superstarid: new FormControl(""),
    ctrl_showid: new FormControl("", Validators.required),
    ctrl_championshiporder: new FormControl(0, Validators.required)
  });

  constructor(
    public dialog: MatDialog,
    private dialogref: MatDialogRef<AddChampionshipDialogComponent>,
    private showservice: ShowManagementService,
    private superstarsService: SuperstarsService,
    private championshipManagementService: ChampionshipManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.gatherData();
  }

  gatherData() {
    this.getChampionshipTypeList();
    this.getSuperstarList();
    this.getShowList();
  }

  getChampionshipTypeList() {
    this.ngxSpinnerService.start("LOADING");

    this.championshipManagementService.getChampionshipTypeList().subscribe(
      (result: any) => {
        this.championshiptypeData = result;
        this.championshiptypeData = this.championshiptypeData.filter((data: any) => data.isActive == true); // I can use this to avoid filtering using input filter
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
        this.dialogref.close();
      }
    );
  }

  getSuperstarList() {
    this.ngxSpinnerService.start("LOADING");

    this.superstarsService.getSuperstarList().subscribe(
      (result: any) => {
        this.superstarData = result;
        this.superstarData = this.superstarData.filter((data: any) => data.isActive == true); // I can use this to avoid filtering using input filter
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
        this.dialogref.close();
      }
    );
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

  onSubmit() {
    if (this.formGroup.valid) {
      this.ngxSpinnerService.start("SAVING");

      this.championshipManagementService.addChampionship(this.addChampionshipData()).subscribe(
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

  addChampionshipData(): AddChampionshipManagement {
    return this.addChampionshipManagement = {
      championshipName: this.formGroup.value['ctrl_championshipname'],
      championshipTypeId: this.formGroup.value['ctrl_championshiptypeid'],
      superstarId: this.formGroup.value['ctrl_superstarid'] == '' ? null : this.formGroup.value['ctrl_superstarid'],
      showId: this.formGroup.value['ctrl_showid'] == '' ? null : this.formGroup.value['ctrl_showid'],
      championshipOrder: this.formGroup.value['ctrl_championshiporder']
    };
  }

}
