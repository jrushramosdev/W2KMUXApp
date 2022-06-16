import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowManagementService } from '../../../../shared/services/show-management.service';
import { PPVManagementService } from '../../../../shared/services/ppv-management.service';
import { ResponseDialogService } from '../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { UpdatePPVManagement } from '../../../../models/ppv-management';

@Component({
  selector: 'app-edit-ppv-dialog',
  templateUrl: './edit-ppv-dialog.component.html',
  styleUrls: ['./edit-ppv-dialog.component.scss']
})
export class EditPpvDialogComponent implements OnInit {
  updatePPVManagement!: UpdatePPVManagement;
  showData: any;
  hasChange: boolean = false;

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_ppvid: new FormControl(""),
    ctrl_ppvname: new FormControl("", Validators.required),
    ctrl_ppvmonth: new FormControl("", Validators.required),
    ctrl_showid: new FormControl("", Validators.required),
    ctrl_ppvorder: new FormControl("", Validators.required),
    ctrl_isactive: new FormControl("", Validators.required)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public matdata: any,
    public dialog: MatDialog,
    private dialogref: MatDialogRef<EditPpvDialogComponent>,
    private showservice: ShowManagementService,
    private ppvservice: PPVManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getShowList();
    this.getPPVManagementList();
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
        if (error.status == 0) {this.snackbarService.openSnackBar("Network Error, The network connection is lost", "close");}
        else {
          if (error.error.ErrorMessage == undefined || error.error.ErrorMessage == "") {this.snackbarService.openSnackBar(error.error, "close");}
          else {this.snackbarService.openSnackBar(error.error.ErrorMessage, "close");}}
        this.dialogref.close();
      }
    );
  }

  getPPVManagementList() {
    if (this.matdata.id != undefined) {
      this.ngxSpinnerService.start("LOADING");

      this.ppvservice.getPPV(this.matdata.id).subscribe(
        (result: any) => {
          this.updatePPVManagement = result;
          this.patchPPVManagementData();
          this.ngxSpinnerService.stop();
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
  
  patchPPVManagementData() {
    this.formGroup.patchValue({
      ctrl_ppvid: this.updatePPVManagement.ppvId,
      ctrl_ppvname: this.updatePPVManagement.ppvName,
      ctrl_ppvmonth: this.updatePPVManagement.ppvMonth,
      ctrl_showid: this.updatePPVManagement.showId,
      ctrl_ppvorder: this.updatePPVManagement.ppvOrder,
      ctrl_isactive: this.updatePPVManagement.isActive
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
  
        this.ppvservice.updatePPV(this.updatePPVManagementData()).subscribe(
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

  updatePPVManagementData(): UpdatePPVManagement {
    return this.updatePPVManagement = {
      ppvId: this.formGroup.value['ctrl_ppvid'],
      ppvName: this.formGroup.value['ctrl_ppvname'],
      ppvMonth: this.formGroup.value['ctrl_ppvmonth'],
      showId: this.formGroup.value['ctrl_showid'],
      ppvOrder: this.formGroup.value['ctrl_ppvorder'],
      isActive: this.formGroup.value['ctrl_isactive']
    };
  }
  
}
