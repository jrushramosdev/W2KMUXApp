import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChampionshipManagementService } from '../../../../shared/services/championship-management.service';
import { ResponseDialogService } from '../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { AddChampionshipTypeManagement } from '../../../../models/championship-management';

@Component({
  selector: 'app-add-championshiptype-dialog',
  templateUrl: './add-championshiptype-dialog.component.html',
  styleUrls: ['./add-championshiptype-dialog.component.scss']
})
export class AddChampionshiptypeDialogComponent implements OnInit {
  addChampionshipTypeManagement!: AddChampionshipTypeManagement;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_championshiptypename: new FormControl("", Validators.required)
  });

  constructor(
    public dialog: MatDialog,
    private dialogref: MatDialogRef<AddChampionshiptypeDialogComponent>,
    private service: ChampionshipManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.ngxSpinnerService.start("SAVING");

      this.service.addChampionshipType(this.addChampionshipTypeData()).subscribe(
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

  addChampionshipTypeData(): AddChampionshipTypeManagement {
    return this.addChampionshipTypeManagement = {
      championshipTypeName: this.formGroup.value['ctrl_championshiptypename']
    };
  }

}
