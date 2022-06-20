import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowManagementService } from '../../shared/services/show-management.service';
import { ChampionshipManagementService } from '../../shared/services/championship-management.service';
import { ResponseDialogService } from '../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../shared/components/ngx-spinner/ngx-spinner.service';
import { ShowManagement } from '../../models/show-management';
import { ChampionsList } from '../../models/championship-management';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss']
})
export class ChampionsComponent implements OnInit {
  showData!: ShowManagement[];
  ChampionsList!: ChampionsList[];
  checked: boolean = false;

  constructor(
    private router: Router,
    private showManagementService: ShowManagementService,
    private championshipManagementService: ChampionshipManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.gatherData();
  }

  gatherData() {
    this.getShowList();
    this.getChampionsList();
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

  getChampionsList() {
    this.ngxSpinnerService.start("LOADING");

    this.championshipManagementService.getChampionsList().subscribe(
      (result: any) => {
        this.ChampionsList = result;
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

  prepareData() {
    // this.showData.forEach(showdata => {
    //   var teamhistoryNestedTemp: TeamHistoryNested[] = [];
    //   var maleMemberCount = 0;
    //   var femaleMemberCount = 0;
    //   var totalMemberCount = 0;

    //   this.teamHistoryNested.forEach(teamhistorynested => {
    //     if (showdata.showId == teamhistorynested.teamShowId) {
    //       if (teamhistorynested.teamGender.toLowerCase() == "male") {
    //         maleMemberCount = maleMemberCount + teamhistorynested.teamCount;
    //       }
    //       else {
    //         femaleMemberCount = femaleMemberCount + teamhistorynested.teamCount;
    //       }

    //       totalMemberCount = totalMemberCount + teamhistorynested.teamCount;
    //       teamhistoryNestedTemp.push(teamhistorynested);
    //     }
    //   })
      
    //   if (totalMemberCount != 0)
    //   {
    //     this.teamHistoryMasterData.push({
    //       teamHistoryShowName: showdata.showName,
    //       totalMaleMemberCount: maleMemberCount,
    //       totalFemaleMemberCount: femaleMemberCount,
    //       totalTeamMemberCount: totalMemberCount,
    //       teamList: teamhistoryNestedTemp
    //     })
    //   }
    // })

    // this.onFilter("Male");
  }
}
