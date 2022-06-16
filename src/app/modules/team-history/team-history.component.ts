import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TeamManagementService } from '../../shared/services/team-management.service';
import { ResponseDialogService } from '../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../shared/components/ngx-spinner/ngx-spinner.service';
import { TeamHistoryNested } from '../../models/team-management';

@Component({
  selector: 'app-team-history',
  templateUrl: './team-history.component.html',
  styleUrls: ['./team-history.component.scss']
})
export class TeamHistoryComponent implements OnInit {
  teamHistoryNested!: TeamHistoryNested[];

  constructor(
    private location: Location,
    private teamManagementService: TeamManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getTeamHistoryList();
  }

  getTeamHistoryList() {
    this.ngxSpinnerService.start("LOADING");

    this.teamManagementService.getTeamHistoryList("false").subscribe(
      (result: any) => {
        this.teamHistoryNested = result;
        this.sortTeamHistory();
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

  sortTeamHistory() {
    const teamlist = [...this.teamHistoryNested]; // clone array

    var sortedData = teamlist.map((teams) => {
      return {...teams, superstar: teams.superstar.sort((a : any, b : any) => b.isActive - a.isActive)}
    })

    this.teamHistoryNested = sortedData;
    console.log(this.teamHistoryNested)
  }

  onBack() {
    this.location.back();
  }

}
