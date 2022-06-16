import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowManagementService } from '../../shared/services/show-management.service';
import { TeamManagementService } from '../../shared/services/team-management.service';
import { ResponseDialogService } from '../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../shared/components/ngx-spinner/ngx-spinner.service';
import { ShowManagement } from '../../models/show-management';
import { TeamHistory, TeamHistoryNested } from '../../models/team-management';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  showData!: ShowManagement[];
  teamHistory: TeamHistory[] = [];
  teamHistoryMasterData: TeamHistory[] = [];
  teamHistoryNested!: TeamHistoryNested[];
  checked: boolean = false;

  constructor(
    private router: Router,
    private showManagementService: ShowManagementService,
    private teamManagementService: TeamManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.gatherData();
  }

  prepareData() {
    this.showData.forEach(showdata => {
      var teamhistoryNestedTemp: TeamHistoryNested[] = [];
      var maleMemberCount = 0;
      var femaleMemberCount = 0;
      var totalMemberCount = 0;

      this.teamHistoryNested.forEach(teamhistorynested => {
        if (showdata.showId == teamhistorynested.teamShowId) {
          if (teamhistorynested.teamGender.toLowerCase() == "male") {
            maleMemberCount = maleMemberCount + teamhistorynested.teamCount;
          }
          else {
            femaleMemberCount = femaleMemberCount + teamhistorynested.teamCount;
          }

          totalMemberCount = totalMemberCount + teamhistorynested.teamCount;
          teamhistoryNestedTemp.push(teamhistorynested);
        }
      })
      
      if (totalMemberCount != 0)
      {
        this.teamHistoryMasterData.push({
          teamHistoryShowName: showdata.showName,
          totalMaleMemberCount: maleMemberCount,
          totalFemaleMemberCount: femaleMemberCount,
          totalTeamMemberCount: totalMemberCount,
          teamList: teamhistoryNestedTemp
        })
      }
    })

    this.onFilter("Male");
  }

  gatherData() {
    this.getShowList();
    this.getTeamHistoryList();
  }

  getShowList() {
    this.ngxSpinnerService.start("LOADING");

    this.showManagementService.getShowList().subscribe(
      (result: any) => {
        this.showData = result;
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
        this.teamHistoryNested = result;
        this.prepareData();
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

  openTeamHistory() {
    this.router.navigate(['teamhistory']);
  }

  onToggle(checked: boolean) {
    if (checked) {
      this.onFilter("Female");
    }
    else {
      this.onFilter("Male");
    }
  }

  onFilter(gender: string) {
    const teamlist = [...this.teamHistoryMasterData]; // clone array

    var filteredData = teamlist.map((teams) => {
      return {...teams, teamList: teams.teamList.filter((subElement: any) => subElement.teamGender === gender)}
    })

    this.teamHistory = filteredData;
  }

}
