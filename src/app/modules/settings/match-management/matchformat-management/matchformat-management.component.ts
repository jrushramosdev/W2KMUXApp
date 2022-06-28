import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddMatchformatDialogComponent } from './add-matchformat-dialog/add-matchformat-dialog.component';
import { EditMatchformatDialogComponent } from './edit-matchformat-dialog/edit-matchformat-dialog.component';
import { MatchManagementService } from 'src/app/shared/services/match-management.service'; 
import { ResponseDialogService } from '../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { MatchFormatManagement } from '../../../../models/match-management';

@Component({
  selector: 'app-matchformat-management',
  templateUrl: './matchformat-management.component.html',
  styleUrls: ['./matchformat-management.component.scss']
})
export class MatchformatManagementComponent implements OnInit, AfterViewInit {
  //** Material Table Configuration */
  displayedColumns: string[] = ['matchFormatName','matchTypeName','teamsCount','participantCount','handicapCount','matchFormatOrder','action'];
  dataSource: MatTableDataSource<MatchFormatManagement>;

  matchFormatManagement!: MatchFormatManagement[];
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
    private service: MatchManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { 
    this.dataSource = new MatTableDataSource(this.matchFormatManagement);
  }

  ngOnInit(): void {
    this.isNoRecord = true;
    this.getMatchFormatManagementList();
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

  getMatchFormatManagementList() {
    this.ngxSpinnerService.start("LOADING");

    this.service.getMatchFormatList().subscribe(
      (result: any) => {
        this.matchFormatManagement = result;
        this.dataSource.data = this.matchFormatManagement;
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
    let dialog = this.responseDialogService.start("DELETE","Are you sure to delete this Match Format '"+element.matchFormatName+"'?");

    dialog.afterClosed().subscribe(dialogresult => {
      if (dialogresult != undefined) {
        if (dialogresult == "OK") {
          this.ngxSpinnerService.start("DELETING");

          this.service.deleteMatchFormat(element.matchFormatId).subscribe(
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
    let dialogRef = this.dialog.open(AddMatchformatDialogComponent, {
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
    let dialogRef = this.dialog.open(EditMatchformatDialogComponent, {
      minWidth: '35vw',
      disableClose: true,
      data: {
        id: element.matchFormatId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.ngOnInit();
      }
    });
  }
}
