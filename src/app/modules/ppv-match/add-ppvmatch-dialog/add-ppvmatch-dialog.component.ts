import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { PpvMatchService } from 'src/app/shared/services/ppv-match.service';
import { PPVManagementService } from 'src/app/shared/services/ppv-management.service';
import { MatchManagementService } from 'src/app/shared/services/match-management.service';
import { SuperstarsService } from '../../../shared/services/superstars.service';
import { ChampionshipManagementService } from '../../../shared/services/championship-management.service';
import { ShowManagementService } from 'src/app/shared/services/show-management.service';
import { ResponseDialogService } from '../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { AddPPVMatch, AddChampionship, AddTeam, AddParticipant } from 'src/app/models/ppv-match';
import { MatchFormatManagement, MatchTypeManagement, MatchTitleManagement } from 'src/app/models/match-management';
import { Superstars } from 'src/app/models/superstars';
import { ChampionshipManagement, PPVMatchChampionship } from 'src/app/models/championship-management'
import { ShowManagement } from 'src/app/models/show-management'
import { map, startWith, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-ppvmatch-dialog',
  templateUrl: './add-ppvmatch-dialog.component.html',
  styleUrls: ['./add-ppvmatch-dialog.component.scss']
})
export class AddPpvmatchDialogComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];

  ppvData: any;
  addPPVMatch!: AddPPVMatch;
  matchTitleList: MatchTitleManagement[] = [];
  matchFormatList: MatchFormatManagement[] = [];
  matchFormatMasterList: MatchFormatManagement[] = [];
  matchTypeList: MatchTypeManagement[] = [];
  superstarList: Superstars[] = [];
  championshipList: ChampionshipManagement[] = [];
  showList: ShowManagement[] = [];

  ppvName: string = "";
  ppvMatchName: string = "";
  matchTitle: string = "";
  matchType: string = "";
  panelTeamCount: number = 0;
  panelHandicapCount: number = 0;
  panelParticipantCount: number = 0;

  nestedFormGroup!: FormGroup;
  ctrl_customppvname = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public matdata: any,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogref: MatDialogRef<AddPpvmatchDialogComponent>,
    private ppvMatchService: PpvMatchService,
    private ppvManagementService: PPVManagementService,
    private matchManagementService: MatchManagementService,
    private superstarsService: SuperstarsService,
    private championshipManagementService: ChampionshipManagementService,
    private showManagementService: ShowManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.gatherData();
    this.initMatchFormGroup();
  }

  //* Dynamic Nested FormGroup */
  initMatchFormGroup() {
    this.nestedFormGroup = this.fb.group({
      ctrl_ppvmatchname: new FormControl("", Validators.required),
      ctrl_ppvmatchcount: new FormControl(0, Validators.required),
      ctrl_ppvid: new FormControl("", Validators.required),
      ctrl_showid: new FormControl("", Validators.required),
      ctrl_matchtitleid: new FormControl("", Validators.required),
      ctrl_matchtypeid: new FormControl("", Validators.required),
      ctrl_matchformatid: new FormControl({value: "", disabled: true}, Validators.required),
      ctrl_ischampionship: new FormControl(false),
      fa_championship: this.fb.array([
        // this.initChampionshipGroup("")
      ]),
      fa_matchteam: this.fb.array([
        this.initMatchTeamGroup()
      ])
    })

    this.addMatchTeamGroup();
  }

  initChampionshipGroup(id: string) {
    return this.fb.group({
      ctrl_championshipid: new FormControl(id)
    })
  }

  initMatchTeamGroup() {
    return this.fb.group({
      ctrl_ischampion: new FormControl(false),
      fa_matchparticipant: this.fb.array([
        //this.initMatchParticapntGroup()
      ])
    })
  }

  initMatchParticapntGroup() {
    return this.fb.group({
      ctrl_superstarid: new FormControl("", Validators.required)
    })
  }

  addMatchTeamGroup() { // Approach: Option 1
    const control = <FormArray>this.nestedFormGroup.controls['fa_matchteam'] as FormArray;
    control.push(this.initMatchTeamGroup());
  }

  addMatchParticipantGroup(index: number, iparticipant: number) { // Approach: Option 2
    this.matchParticipantGroup(index).push(this.initMatchParticapntGroup());
    this.manageParticipantNameCtrl(index, iparticipant);
  }

  removeMatchTeamGroup() { 
    const control = this.matchTeamGroup()
    control.clear();
  }

  removeParticipantTeamGroup() {
    for (let t = 0; t < this.matchTeamGroup().length; t++) {
      if (this.panelParticipantCount > 1) {
        for (let i = 0; i < this.panelParticipantCount-1; i++) {
          this.matchParticipantGroup(t).removeAt(1);
        }
      }
    }
  }

  matchChampionship() : FormArray {
    return this.nestedFormGroup.get('fa_championship') as FormArray;
  }

  matchTeamGroup() : FormArray {
    return this.nestedFormGroup.get('fa_matchteam') as FormArray;
  }

  matchParticipantGroup(index: number) : FormArray {
    return this.matchTeamGroup().at(index).get('fa_matchparticipant') as FormArray;
  }

  patchPPVMatchChampionship() {
    const control = <FormArray>this.nestedFormGroup.controls['fa_championship'] as FormArray;
    control.clear();
    this.championship.forEach(championship => {
      control.push(this.initChampionshipGroup(championship.championshipId));
    })
  }

  //* Dynamic Auto Complete and Filter */
  filteredSuperstarList: Observable<Superstars[]>[] = []
  manageParticipantNameCtrl(index: number, iparticipant: number) {
    var control = this.matchParticipantGroup(index);
    var superstartControl = control.at(iparticipant).get('ctrl_superstarid') as FormArray;
    this.filteredSuperstarList[parseInt(index.toString()+iparticipant.toString())] = superstartControl.valueChanges
      .pipe(
      startWith<string | Superstars>(''), 
      map(value => typeof value === 'string' ? value : value.superstarName),
      map(name => name ? this._filterParticipant(name) : this.superstarList.slice())
    );
  }

  _filterParticipant(value: string) : Superstars[] {
    const _filterValue = value.toLowerCase();
    return this.superstarList.filter((option: { superstarName: string; }) => option.superstarName.toLowerCase().includes(_filterValue));
  }

  displayFn(object: any) {
    return object ? object.superstarName : undefined;
  }

  getnumber(index: number, iparticipant: number) : number {
    return parseInt(index.toString()+iparticipant.toString())
  } 

  //#region Gather Data
  gatherData() {
    this.getPPVManagement();
    this.getMatchTitleList();
    this.getMatchFormatList();
    this.getMatchTypeList();
    this.getSuperstarList();
    this.getChampionship();
    this.getShowList();
    // this.getParentData();
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
        this.matchFormatMasterList = result; // create master copy
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
        this.filteredChampList = this.ctrl_championship.valueChanges.pipe(startWith(null), map(value => this._filterChamp(value)));
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

    this.showManagementService.getShowList().subscribe(
      (result: any) => {
        this.showList = result;
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
        this.dialogref.close();
      }
    );
  }

  patchPPVMatchData() {
    this.ppvName = this.ppvData.ppvName + ' ' + this.matdata.ppvcount;
    this.nestedFormGroup.patchValue({
      ctrl_ppvmatchcount: this.matdata.ppvcount,
      ctrl_ppvid: this.matdata.ppvid,
    });
  }
  //#endregion

  onSubmit() {
    this.getPPVMatchName(this.matchTitle, this.matchType);
    this.nestedFormGroup.patchValue({
      ctrl_ppvmatchname: this.ppvMatchName
    });

    if (this.nestedFormGroup.valid) {
      this.patchPPVMatchChampionship();
      this.ngxSpinnerService.start("SAVING");
      this.ppvMatchService.addPPVMatch(this.addPPVMatchData()).subscribe(
        (result: any) => {
          this.ngxSpinnerService.stop();
          this.responseDialogService.start("SUCCESS", result);
          this.dialogref.close('success');
        }, error => {
          this.ngxSpinnerService.stop();
          this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
          this.dialogref.close();
        }
      );
    }
  }

  addPPVMatchData() : AddPPVMatch {
    var addchampionshipTemp: AddChampionship[] = [];
    var matchChampionshipCnt = this.matchChampionship().length;
    if (matchChampionshipCnt > 0) {
      for (let i = 0; i < matchChampionshipCnt; i++) {
        var controlMC = this.matchChampionship().at(i).get('ctrl_championshipid') as FormArray;
        addchampionshipTemp.push({
          championshipId: controlMC.value
        })
      }
    }

    var addteamTemp: AddTeam[] = [];
    var matchTeamCnt = this.matchTeamGroup().length;
    if (matchTeamCnt > 0) {
      for (let i = 0; i < matchTeamCnt; i++) {
        var addparticipantTemp: AddParticipant[] = []; 
        var matchParticipantCnt = this.matchParticipantGroup(i).length;

        for (let ip = 0; ip < matchParticipantCnt; ip++) {
          var controlSS = this.matchParticipantGroup(i).at(ip).get('ctrl_superstarid') as FormArray;
          addparticipantTemp.push({
            superstarId: controlSS.value.superstarId
          })
        }

        var controlT = this.matchTeamGroup().at(i).get('ctrl_ischampion') as FormArray;
        addteamTemp.push({
          isChampion: controlT.value,
          participant: addparticipantTemp
        })
      }
    }

    return this.addPPVMatch = {
      ppvMatchName: this.nestedFormGroup.value['ctrl_ppvmatchname'],
      ppvMatchCount: this.nestedFormGroup.value['ctrl_ppvmatchcount'],
      ppvId: this.nestedFormGroup.value['ctrl_ppvid'],
      showId: this.nestedFormGroup.value['ctrl_showid'],
      matchTitleId: this.nestedFormGroup.value['ctrl_matchtitleid'],
      matchFormatId: this.nestedFormGroup.value['ctrl_matchformatid'],
      championship: addchampionshipTemp,
      team: addteamTemp
    };
  }

  //#region Get Name Function
  getPPVMatchName(matchtitlename: string, matchtypename: string) {
    if (matchtitlename != "No Title") {
      this.ppvMatchName = this.getPPVMatchNamePB() + this.getPPVMatchNamePA(matchtypename);
    }
    else {
      this.ppvMatchName = this.getPPVMatchNamePB() + this.ctrl_customppvname.value;
    }
  }

  getPPVMatchNamePA(matchtypename: string) {
    let result = "";
    switch(matchtypename) {
      case "Normal": {
        result = this.matchTitle;
        break;
      }
      case "Tag Team": {
        result = matchtypename + " " + this.matchTitle
        break;
      }
      case "Handicap": {
        result = matchtypename;
        break;
      }
    }
    return result;
  }

  getPPVMatchNamePB() {
    let result = "";
    this.championship.forEach(championshipdata => {
      result = result + championshipdata.championshipName + " | " ;
    })
    return result;
  }
  //#endregion

  changeMatchTitle(matchtitlename: string) {
    this.matchTitle = matchtitlename;
  }

  changeMatchType(element: any) {
    this.nestedFormGroup.patchValue({
      ctrl_matchformatid: ""
    }); // clear match format value for validation purposes

    this.matchType = element.matchTypeName;

    this.nestedFormGroup.controls["ctrl_matchformatid"].enable();

    const mactchformatlist = [...this.matchFormatMasterList]; // clone array

    var filteredData = mactchformatlist.filter(function(obj) {
      return obj.matchTypeId === element.matchTypeId;
    });

    this.matchFormatList = filteredData;
  }

  changeMatchFormat(element: any) {
    this.removeMatchTeamGroup();

    this.panelTeamCount = element.teamsCount;
    this.panelHandicapCount = element.handicapCount;
    this.panelParticipantCount = element.participantCount;

    for (let t = 0; t < this.panelTeamCount; t++) {
      this.addMatchTeamGroup();
      let participantCount = this.panelParticipantCount;
      if (this.panelHandicapCount > 0) { // handicap
        participantCount = this.panelHandicapCount
      }

      for (let i = 0; i < participantCount; i++) {
        this.addMatchParticipantGroup(t,i);
      }

      this.panelHandicapCount = 0; // reset handicap
    }
  }

  //* Chip and Auto Complete */
  ctrl_championship = new FormControl('');
  championship: PPVMatchChampionship[] = [];
  filteredChampList: any;

  removeChamp(index: number): void {
    this.championship.splice(index, 1);  
  }

  selectedChamp(event: MatAutocompleteSelectedEvent): void {
    let selectedvalue = event.option.value;
    let chkdata = this.championshipList.filter((value: { championshipName: string; }) => value.championshipName.toLowerCase() == (selectedvalue.toLowerCase()))
    if (chkdata.length > 0) { 
      var tempChamp = {
        championshipName: selectedvalue,
        championshipId: chkdata[0].championshipId
      }
      this.championship.push(tempChamp)
    }
    this.ctrl_championship.setValue(null);
  }

  _filterChamp(value: string): ChampionshipManagement[] {
    return value ? this.championshipList.filter((option: { championshipName: string; }) => option.championshipName.toLowerCase().indexOf(value.toLowerCase()) === 0) : this.championshipList
  }
}
