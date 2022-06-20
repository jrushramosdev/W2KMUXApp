import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowManagementService } from '../../shared/services/show-management.service';
import { ChampionshipManagementService } from '../../shared/services/championship-management.service';
import { ResponseDialogService } from '../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../shared/components/ngx-spinner/ngx-spinner.service';
import { ShowManagement } from '../../models/show-management';
import { ChampionsList, ChampionsNested } from '../../models/championship-management';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss']
})
export class ChampionsComponent implements OnInit {
  showData!: ShowManagement[];
  championsList: ChampionsList[] = [];
  championsNested!: ChampionsNested[];
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
        this.championsNested = result;
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
    this.showData.forEach(showdata => {
      var championsNestedTemp: ChampionsNested[] = [];

      this.championsNested.forEach(championsNested => {
        if (showdata.showId == championsNested.championshipShowId) {
          championsNested.championshipTeamName = championsNested.superstars[0].teamName;
          championsNestedTemp.push(championsNested);
        }
      })

      if (championsNestedTemp.length > 0) {
        this.championsList.push({
          championsListShowName: showdata.showName,
          championsList: championsNestedTemp
        })
      }
    })
  }

  openChampionHistory() {

  }
}
