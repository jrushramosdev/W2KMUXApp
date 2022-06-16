import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ShowManagementService } from '../../shared/services/show-management.service';
import { SuperstarsService } from '../../shared/services/superstars.service';
import { TeamManagementService } from '../../shared/services/team-management.service';
import { ResponseDialogService } from '../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../shared/components/ngx-spinner/ngx-spinner.service';
import { ShowManagement } from '../../models/show-management';
import { Superstars } from '../../models/superstars';
import { TeamHistoryNested } from '../../models/team-management';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit, AfterViewInit {
  //** Material Table Configuration */
  displayedColumns: string[] = ['superstarName','championshipName','teamName','role','isInjured'];
  teamDisplayedColumns: string[] = ['teamName','teamCount','teamRole'];
  maleDataSource: MatTableDataSource<Superstars>;
  femaleDataSource: MatTableDataSource<Superstars>;
  maleTeamDataSource: MatTableDataSource<TeamHistoryNested>;
  femaleTeamDataSource: MatTableDataSource<TeamHistoryNested>;

  showData: ShowManagement[] = [];
  superstar: Superstars[] = [];
  teamHistory: TeamHistoryNested[] = [];
  maleCount: number = 0;
  femaleCount: number = 0;
  totalCount: number = 0;
  maleTeamCount: number = 0;
  femaleTeamCount: number = 0;
  totalTeamCount: number = 0;
  showId: string = "Raw";

  //* Workaround for paginator and sort work with *ngIf
  @ViewChild('maleMatSort') maleMatSort = new MatSort();
  @ViewChild('femaleMatSort') femaleMatSort = new MatSort();
  @ViewChild('maleTeamMatSort') maleTeamMatSort = new MatSort();
  @ViewChild('femaleTeamMatSort') femaleTeamMatSort = new MatSort();

  constructor(
    public dialog: MatDialog, 
    private showManagementService: ShowManagementService,
    private superstarsService: SuperstarsService,
    private teamManagementService: TeamManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService
  ) { 
    this.maleDataSource = new MatTableDataSource(this.superstar);
    this.femaleDataSource = new MatTableDataSource(this.superstar);
    this.maleTeamDataSource = new MatTableDataSource(this.teamHistory);
    this.femaleTeamDataSource = new MatTableDataSource(this.teamHistory);
  }

  ngOnInit(): void {
    this.gatherData();
  }

  ngAfterViewInit() {
    this.maleDataSource.sort = this.maleMatSort;
    this.femaleDataSource.sort = this.femaleMatSort;
    this.maleTeamDataSource.sort = this.maleTeamMatSort;
    this.femaleTeamDataSource.sort = this.femaleTeamMatSort;
  }

  applySuperstarFilter() {
    const dataList = [...this.superstar]; // clone array

    let filteredShowData = dataList.filter((data: any) => data.showId === this.showId);
    
    let filteredMaleData = filteredShowData.filter((data: any) => data.gender.toString() === "Male");
    let filteredFemaleData = filteredShowData.filter((data: any) => data.gender.toString() === "Female");

    this.maleCount = filteredMaleData.length;
    this.femaleCount = filteredFemaleData.length;
    this.totalCount = this.maleCount + this.femaleCount;

    this.maleDataSource.data = filteredMaleData;
    this.femaleDataSource.data = filteredFemaleData;
  }

  applyTeamHistoryFilter() {
    const dataList = [...this.teamHistory]; // clone array

    let filteredShowData = dataList.filter((data: any) => data.teamShowId === this.showId);

    let filteredMaleData = filteredShowData.filter((data: any) => data.teamGender.toString() === "Male");
    let filteredFemaleData = filteredShowData.filter((data: any) => data.teamGender.toString() === "Female");

    this.maleTeamCount = filteredMaleData.length;
    this.femaleTeamCount = filteredFemaleData.length;
    this.totalTeamCount = this.maleTeamCount + this.femaleTeamCount;

    this.maleTeamDataSource.data = filteredMaleData;
    this.femaleTeamDataSource.data = filteredFemaleData;
  }

  gatherData() {
    this.getShowList();
    this.getSuperstarList();
    this.getTeamHistoryList();
  }

  getShowList() {
    this.ngxSpinnerService.start("LOADING");

    this.showManagementService.getShowList().subscribe(
      (result: any) => {
        this.showData = result;
        this.changeRoster(this.showData[0].showId)
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        if (error.status == 0) {this.snackbarService.openSnackBar("Network Error, The network connection is lost", "close");}
        else {
          if (error.error.ErrorMessage == undefined || error.error.ErrorMessage == "") {this.snackbarService.openSnackBar(error.error, "close");}
          else {this.snackbarService.openSnackBar(error.error.ErrorMessage, "close");}}
      }
    );
  }

  getSuperstarList() {
    this.ngxSpinnerService.start("LOADING");

    this.superstarsService.getSuperstarList().subscribe(
      (result: any) => {
        this.superstar = result;
        this.applySuperstarFilter();
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        if (error.status == 0) {this.snackbarService.openSnackBar("Network Error, The network connection is lost", "close");}
        else {
          if (error.error.ErrorMessage == undefined || error.error.ErrorMessage == "") {this.snackbarService.openSnackBar(error.error, "close");}
          else {this.snackbarService.openSnackBar(error.error.ErrorMessage, "close");}}
      }
    );
  }

  getTeamHistoryList() {
    this.ngxSpinnerService.start("LOADING");

    this.teamManagementService.getTeamHistoryList("true").subscribe(
      (result: any) => {
        this.teamHistory = result;
        this.applyTeamHistoryFilter();
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        if (error.status == 0) {this.snackbarService.openSnackBar("Network Error, The network connection is lost", "close");}
        else {
          if (error.error.ErrorMessage == undefined || error.error.ErrorMessage == "") {this.snackbarService.openSnackBar(error.error, "close");}
          else {this.snackbarService.openSnackBar(error.error.ErrorMessage, "close");}}
      }
    );
  }

  changeRoster(showid: string) {
    this.showId = showid;
    this.applySuperstarFilter();
    this.applyTeamHistoryFilter();
  }

  openAchievements() {
    console.log("teste")
  }
}
