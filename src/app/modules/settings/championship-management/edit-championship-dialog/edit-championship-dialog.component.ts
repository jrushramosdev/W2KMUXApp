import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowManagementService } from '../../../../shared/services/show-management.service';
import { SuperstarsService } from '../../../../shared/services/superstars.service';
import { ChampionshipManagementService } from '../../../../shared/services/championship-management.service';
import { ResponseDialogService } from '../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { UpdateChampionshipManagement } from '../../../../models/championship-management';

@Component({
  selector: 'app-edit-championship-dialog',
  templateUrl: './edit-championship-dialog.component.html',
  styleUrls: ['./edit-championship-dialog.component.scss']
})
export class EditChampionshipDialogComponent implements OnInit {
  updateChampionshipManagement!: UpdateChampionshipManagement;
  championshiptypeData: any;
  superstarData: any;
  showData: any;
  hasChange: boolean = false;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_championshipid: new FormControl("", Validators.required),
    ctrl_championshipname: new FormControl("", Validators.required),
    ctrl_championshiptypeid: new FormControl("", Validators.required),
    ctrl_superstarid: new FormControl(""),
    ctrl_showid: new FormControl("", Validators.required),
    ctrl_championshiporder: new FormControl(0, Validators.required),
    ctrl_isactive: new FormControl(true, Validators.required)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public matdata: any,
    public dialog: MatDialog,
    private dialogref: MatDialogRef<EditChampionshipDialogComponent>,
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
    this.getChampionship();
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

  getChampionship() {
    if (this.matdata.id != undefined) {
      this.ngxSpinnerService.start("LOADING");

      this.championshipManagementService.getChampionship(this.matdata.id).subscribe(
        (result: any) => {
          this.updateChampionshipManagement = result;
          this.patchChampionshipData();
          this.ngxSpinnerService.stop();
        }, error => {
          this.ngxSpinnerService.stop();
          this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
          this.dialogref.close();
        }
      );
    }
  }

  patchChampionshipData() {
    this.formGroup.patchValue({
      ctrl_championshipid: this.updateChampionshipManagement.championshipId,
      ctrl_championshipname: this.updateChampionshipManagement.championshipName,
      ctrl_championshiptypeid: this.updateChampionshipManagement.championshipTypeId,
      ctrl_superstarid: this.updateChampionshipManagement.superstarId == null? "" : this.updateChampionshipManagement.superstarId,
      ctrl_showid: this.updateChampionshipManagement.showId,
      ctrl_championshiporder: this.updateChampionshipManagement.championshipOrder,
      ctrl_isactive: this.updateChampionshipManagement.isActive
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
  
        this.championshipManagementService.updateChampionship(this.updateChampionshipData()).subscribe(
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

  updateChampionshipData(): UpdateChampionshipManagement {
    return this.updateChampionshipManagement = {
      championshipId: this.formGroup.value['ctrl_championshipid'],
      championshipName: this.formGroup.value['ctrl_championshipname'],
      championshipTypeId: this.formGroup.value['ctrl_championshiptypeid'],
      superstarId: this.formGroup.value['ctrl_superstarid'] == '' ? null : this.formGroup.value['ctrl_superstarid'],
      showId: this.formGroup.value['ctrl_showid'],
      championshipOrder: this.formGroup.value['ctrl_championshiporder'],
      isActive: this.formGroup.value['ctrl_isactive']
    };
  }

}
