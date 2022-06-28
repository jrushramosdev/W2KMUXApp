import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddMatchtitleDialogComponent } from './add-matchtitle-dialog/add-matchtitle-dialog.component';
import { EditMatchtitleDialogComponent } from './edit-matchtitle-dialog/edit-matchtitle-dialog.component';
import { MatchManagementService } from 'src/app/shared/services/match-management.service'; 
import { ResponseDialogService } from '../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { MatchTitleManagement } from '../../../../models/match-management';

@Component({
  selector: 'app-matchtitle-management',
  templateUrl: './matchtitle-management.component.html',
  styleUrls: ['./matchtitle-management.component.scss']
})
export class MatchtitleManagementComponent implements OnInit {
  //** Material Table Configuration */
  displayedColumns: string[] = ['matchTitleName','matchTitleOrder','action'];
  dataSource: MatTableDataSource<MatchTitleManagement>;

  matchTitleManagement!: MatchTitleManagement[];
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
    this.dataSource = new MatTableDataSource(this.matchTitleManagement);
  }

  ngOnInit(): void {
    this.isNoRecord = true;
    this.getMatchTitleManagementList();
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

  getMatchTitleManagementList() {
    this.ngxSpinnerService.start("LOADING");

    this.service.getMatchTitleList().subscribe(
      (result: any) => {
        this.matchTitleManagement = result;
        this.dataSource.data = this.matchTitleManagement;
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
    let dialog = this.responseDialogService.start("DELETE","Are you sure to delete this Match Title '"+element.matchTitleName+"'?");

    dialog.afterClosed().subscribe(dialogresult => {
      if (dialogresult != undefined) {
        if (dialogresult == "OK") {
          this.ngxSpinnerService.start("DELETING");

          this.service.deleteMatchFormat(element.matchTitleId).subscribe(
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
    let dialogRef = this.dialog.open(AddMatchtitleDialogComponent, {
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
    let dialogRef = this.dialog.open(EditMatchtitleDialogComponent, {
      minWidth: '35vw',
      disableClose: true,
      data: {
        id: element.matchTitleId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.ngOnInit();
      }
    });
  }

}
