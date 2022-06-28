import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddPpvmatchDialogComponent } from './add-ppvmatch-dialog/add-ppvmatch-dialog.component';
import { PpvMatchService } from '../../shared/services/ppv-match.service';
import { ResponseDialogService } from '../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { PPVMatchLatest } from 'src/app/models/ppv-match';

@Component({
  selector: 'app-ppv-match',
  templateUrl: './ppv-match.component.html',
  styleUrls: ['./ppv-match.component.scss']
})
export class PpvMatchComponent implements OnInit {
  ppvMatchLatestData!: PPVMatchLatest;
  ppvMatchNestedList!: any; // Edit this

  ppvId: string = "";
  ppvCount: number = 1;
  ppvName: string = "";
  isNoRecord: boolean = true;

  screenWidth: number = 0;
  ppvListScreen: boolean = true;

  public ppvmatch: Array<any> = [];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 1500) {
      this.ppvListScreen = false;
    }
    else {
      this.ppvListScreen = true;
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private service: PpvMatchService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private errorHandlerService: ErrorHandlerService,
    private ngxSpinnerService: NgxSpinnerService
  ) { 
    this.getRouteParameter();
  }

  ngOnInit(): void {
    this.ppvmatch = this.service.getPPVMatchArray();
  }

  navigateRoute(count: number) {
    this.router.navigate(['/ppvmatch/',this.ppvId,count]);
  }

  getRouteParameter() {
    this.route.paramMap.subscribe(params => {
      this.ppvId = params.get('ppvid')!;
      this.ppvCount = Number(params.get('ppvcount')!);
      this.gatherData(this.ppvCount);
    });
  }

  gatherData(count: number) {
    this.isNoRecord = true;

    switch (this.ppvId) {
      case "default":
        this.getPPVMatchLatest();
        break;
      default:
        this.getPPVMatch(this.ppvId, count);
        // check result > 0
        break;
    }
    console.log(this.ppvId)
    console.log(this.ppvCount)
  }

  getPPVMatchLatest() {
    this.ngxSpinnerService.start("LOADING");
    
    this.service.getPPVMatchLatest().subscribe(
      (result: any) => {
        this.ppvMatchLatestData = result;
        this.patchInfo("default");
        this.ngxSpinnerService.stop();
        this.router.navigate(['/ppvmatch/',this.ppvId,this.ppvCount]);
      }, error => {
        this.ngxSpinnerService.stop();
        this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
      }
    );
  }

  getPPVMatch(ppvid: string, ppvcount: number) {
    this.ngxSpinnerService.start("LOADING");
    
    this.service.getPPVMatchList(ppvid, ppvcount).subscribe(
      (result: any) => {
        this.ppvMatchNestedList = result;
        this.patchInfo("exact");
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
      }
    );
  }

  patchInfo(status: string) {
    switch (status) {
      case "default":
        this.ppvId = this.ppvMatchLatestData.ppvId;
        this.ppvName = this.ppvMatchLatestData.ppvName;
        this.ppvCount = this.ppvMatchLatestData.ppvMatchCount;
        break;
      case "exact":
        this.ppvId = this.ppvMatchNestedList[0].ppvId;
        this.ppvName = this.ppvMatchNestedList[0].ppvName;
        break;
      default:
        break;
    }
  }

  winner(teamNumber: number, ppvmatchId: number) {   
    
    this.ppvmatch.forEach(ppvmatch => {
      if (ppvmatch.matchId == ppvmatchId) {        
        ppvmatch.matchInfo.forEach((teamArray: { teamParticipant: any, teamNumber: number, isWinner: boolean;  }) => {
          if (teamArray.teamNumber == teamNumber) {
            teamArray.isWinner = true;
          }
          else {
            teamArray.isWinner = false;
          }
        })
      }
    }) 
  }

  openAddDialog() {
    let dialogRef = this.dialog.open(AddPpvmatchDialogComponent, {
      minWidth: '35vw',
      disableClose: true,
      data: {
        ppvid: this.ppvId,
        ppvcount: this.ppvCount
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.ngOnInit();
      }
    });
  }

}
