import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddTeamDialogComponent } from './add-team-dialog/add-team-dialog.component';
import { EditTeamDialogComponent } from './edit-team-dialog/edit-team-dialog.component';
import { TeamManagementService } from '../../../shared/services/team-management.service';
import { ResponseDialogService } from '../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { TeamManagement } from '../../../models/team-management';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.scss']
})
export class TeamManagementComponent implements OnInit, AfterViewInit {
  //** Material Table Configuration */
  displayedColumns: string[] = ['teamName','action'];
  dataSource: MatTableDataSource<TeamManagement>;

  teamManagement!: TeamManagement[];
  isNoRecord: boolean = true;
  checked: boolean = false;

  //* Workaround for paginator and sort work with *ngIf
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }  

  constructor(
    public dialog: MatDialog, 
    private service: TeamManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { 
    this.dataSource = new MatTableDataSource(this.teamManagement);
  }

  ngOnInit(): void {
    this.isNoRecord = true;
    this.getTeamManagementList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    };
  }

  onToggleFilter(checked: boolean) {
    const dataList = [...this.teamManagement]; // clone array

    if (checked == true) {
      var filteredData = dataList;
    }
    else {
      var filteredData = dataList.filter((data: any) => data.isActive.toString() === "true");
    }

    this.dataSource.data = filteredData;
  }

  getTeamManagementList() {
    this.ngxSpinnerService.start("LOADING");

    this.service.getTeamList().subscribe(
      (result: any) => {
        this.teamManagement = result;
        this.onToggleFilter(this.checked);
        this.isNoRecord = false;
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
        this.isNoRecord = true;
      }
    );
  }

  onDelete(element: any) {
    let dialog = this.responseDialogService.start("DELETE","Are you sure to delete this Team '"+element.teamName+"'?");

    dialog.afterClosed().subscribe(dialogresult => {
      if (dialogresult != undefined) {
        if (dialogresult == "OK") {
          this.ngxSpinnerService.start("DELETING");

          this.service.deleteTeam(element.teamId).subscribe(
            (result: any) => {
              this.ngxSpinnerService.stop();
              this.responseDialogService.start("SUCCESS", result);
              this.ngOnInit();
            }, error => {
              this.ngxSpinnerService.stop();
              this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
            }
          );
        }
      }
    });
  }

  openAddDialog() {
    let dialogRef = this.dialog.open(AddTeamDialogComponent, {
      minWidth: '35vw',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.ngOnInit();
      }
    });
  }

  openEditDialog(element: any) {
    let dialogRef = this.dialog.open(EditTeamDialogComponent, {
      minWidth: '35vw',
      disableClose: true,
      data: {
        id: element.teamId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.ngOnInit();
      }
    });
  }

}
