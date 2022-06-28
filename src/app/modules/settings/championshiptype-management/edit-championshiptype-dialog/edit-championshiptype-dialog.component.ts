import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChampionshipManagementService } from '../../../../shared/services/championship-management.service';
import { ResponseDialogService } from '../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { UpdateChampionshipTypeManagement } from '../../../../models/championship-management';

@Component({
  selector: 'app-edit-championshiptype-dialog',
  templateUrl: './edit-championshiptype-dialog.component.html',
  styleUrls: ['./edit-championshiptype-dialog.component.scss']
})
export class EditChampionshiptypeDialogComponent implements OnInit {
  updateChampionshipTypeManagement!: UpdateChampionshipTypeManagement;
  hasChange: boolean = false;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_championshiptypeid: new FormControl("", Validators.required),
    ctrl_championshiptypename: new FormControl("", Validators.required),
    ctrl_isactive: new FormControl(true, Validators.required),
    ctrl_championshiptypeorder: new FormControl(0, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public matdata: any,
    public dialog: MatDialog,
    private dialogref: MatDialogRef<EditChampionshiptypeDialogComponent>,
    private service: ChampionshipManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.getChampionshipTypeList();
  }

  getChampionshipTypeList() {
    if (this.matdata.id != undefined) {
      this.ngxSpinnerService.start("LOADING");

      this.service.getChampionshipType(this.matdata.id).subscribe(
        (result: any) => {
          this.updateChampionshipTypeManagement = result;
          this.patchChampionshipTypeData();
          this.ngxSpinnerService.stop();
        }, error => {
          this.ngxSpinnerService.stop();
          this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
          this.dialogref.close();
        }
      );
    }
  }

  patchChampionshipTypeData() {
    this.formGroup.patchValue({
      ctrl_championshiptypeid: this.updateChampionshipTypeManagement.championshipTypeId,
      ctrl_championshiptypename: this.updateChampionshipTypeManagement.championshipTypeName,
      ctrl_isactive: this.updateChampionshipTypeManagement.isActive,
      ctrl_championshiptypeorder: this.updateChampionshipTypeManagement.championshipTypeOrder,
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
  
        this.service.updateChampionshipType(this.updateChampionshipTypeData()).subscribe(
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

  updateChampionshipTypeData(): UpdateChampionshipTypeManagement {
    return this.updateChampionshipTypeManagement = {
      championshipTypeId: this.formGroup.value['ctrl_championshiptypeid'],
      championshipTypeName: this.formGroup.value['ctrl_championshiptypename'],
      isActive: this.formGroup.value['ctrl_isactive'],
      championshipTypeOrder: this.formGroup.value['ctrl_championshiptypeorder'],
    };
  }

}
