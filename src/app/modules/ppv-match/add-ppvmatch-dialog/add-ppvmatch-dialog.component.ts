import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PpvMatchService } from 'src/app/shared/services/ppv-match.service';
import { PPVManagementService } from 'src/app/shared/services/ppv-management.service';
import { MatchManagementService } from 'src/app/shared/services/match-management.service';
import { SuperstarsService } from '../../../shared/services/superstars.service';
import { ChampionshipManagementService } from '../../../shared/services/championship-management.service';
import { ResponseDialogService } from '../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';

@Component({
  selector: 'app-add-ppvmatch-dialog',
  templateUrl: './add-ppvmatch-dialog.component.html',
  styleUrls: ['./add-ppvmatch-dialog.component.scss']
})
export class AddPpvmatchDialogComponent implements OnInit {
  ppvData: any;
  matchTitleList: any;
  matchFormatList: any;
  matchTypeList: any;
  superstarList: any;
  championshipList: any;

  ppvName: string = "";
  matchTitle: string = "";

  //** Form Groups */
  public formGroup: FormGroup = new FormGroup({
    ctrl_ppvmatchname: new FormControl("", Validators.required),
    ctrl_matchtitleid: new FormControl("", Validators.required),
    ctrl_matchtypeid: new FormControl("", Validators.required),
    ctrl_matchformatid: new FormControl("", Validators.required),
    ctrl_championshipid: new FormControl("")
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public matdata: any,
    public dialog: MatDialog,
    private dialogref: MatDialogRef<AddPpvmatchDialogComponent>,
    private ppvMatchService: PpvMatchService,
    private ppvManagementService: PPVManagementService,
    private matchManagementService: MatchManagementService,
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
    this.getPPVManagement();
    this.getMatchTitleList();
    this.getMatchFormatList();
    this.getMatchTypeList();
    this.getSuperstarList();
    this.getChampionship();
    this.getParentData();
  }

  getPPVManagement() {
    if (this.matdata.ppvid != undefined && this.matdata.ppvcount != undefined) {
      this.ngxSpinnerService.start("LOADING");

      this.ppvManagementService.getPPV(this.matdata.ppvid).subscribe(
        (result: any) => {
          this.ppvData = result;
          this.patchPPVMatchData();
          this.ngxSpinnerService.stop();
        }, error => {
          this.ngxSpinnerService.stop();
          this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
          this.dialogref.close();
        }
      );
    }
    else {
      this.dialogref.close();
    }
  }

  getMatchTitleList() {
    this.ngxSpinnerService.start("LOADING");

    this.matchManagementService.getMatchTitleList().subscribe(
      (result: any) => {
        this.matchTitleList = result;
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
        this.dialogref.close();
      }
    );
  }

  getMatchFormatList() {
    this.ngxSpinnerService.start("LOADING");

    this.matchManagementService.getMatchFormatList().subscribe(
      (result: any) => {
        this.matchFormatList = result;
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
        this.dialogref.close();
      }
    );
  }

  getMatchTypeList() {
    this.ngxSpinnerService.start("LOADING");

    this.matchManagementService.getMatchTypeList().subscribe(
      (result: any) => {
        this.matchTypeList = result;
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
        this.superstarList = result;
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
        this.dialogref.close();
      }
    );
  }

  getChampionship() {
    this.ngxSpinnerService.start("LOADING");

    this.championshipManagementService.getChampionshipList().subscribe(
      (result: any) => {
        this.championshipList = result;
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
        this.dialogref.close();
      }
    );
  }

  getParentData() {
    if (this.matdata.ppvid != undefined && this.matdata.ppvcount != undefined) {
      // this.ppvMatchName = 
    }
  }

  patchPPVMatchData() {
    this.ppvName = this.ppvData.ppvName + ' ' + this.matdata.ppvcount;
  }

  onSubmit() {
    if (this.formGroup.valid) {
      // this.ngxSpinnerService.start("SAVING");

      // this.championshipManagementService.addChampionship(this.addChampionshipData()).subscribe(
      //   (result: any) => {
      //     this.ngxSpinnerService.stop();
      //     this.responseDialogService.start("SUCCESS", result);
      //     this.formGroup.reset();
      //     this.dialogref.close('success');
      //   }, error => {
      //     this.ngxSpinnerService.stop();
      //     if (error.status == 0) {return this.snackbarService.openSnackBar("Network Error, The network connection is lost", "close");}
      //     else {this.snackbarService.openSnackBar(error.error, "close");}
      //   }
      // );
    }
  }

  changeMatchTitle(matchTitleName : string) {
    this.matchTitle = matchTitleName;
  }

}
