import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddMatchtypeDialogComponent } from './add-matchtype-dialog/add-matchtype-dialog.component';
import { EditMatchtypeDialogComponent } from './edit-matchtype-dialog/edit-matchtype-dialog.component';
import { MatchManagementService } from 'src/app/shared/services/match-management.service'; 
import { ResponseDialogService } from '../../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { MatchTypeManagement } from '../../../../models/match-management';

@Component({
  selector: 'app-matchtype-management',
  templateUrl: './matchtype-management.component.html',
  styleUrls: ['./matchtype-management.component.scss']
})
export class MatchtypeManagementComponent implements OnInit, AfterViewInit {
  //** Material Table Configuration */
  displayedColumns: string[] = ['matchtypeName','matchtypeOrder','action'];
  dataSource: MatTableDataSource<MatchTypeManagement>;

  matchTypeManagement!: MatchTypeManagement[];
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
    this.dataSource = new MatTableDataSource(this.matchTypeManagement);
  }


  ngOnInit(): void {
    this.isNoRecord = true;
    this.getMatchTypeManagementList();
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

  getMatchTypeManagementList() {
    this.ngxSpinnerService.start("LOADING");

    this.service.getMatchTypeList().subscribe(
      (result: any) => {
        this.matchTypeManagement = result;
        this.dataSource.data = this.matchTypeManagement;
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
    let dialog = this.responseDialogService.start("DELETE","Are you sure to delete this Match Type '"+element.matchTypeName+"'?");

    dialog.afterClosed().subscribe(dialogresult => {
      if (dialogresult != undefined) {
        if (dialogresult == "OK") {
          this.ngxSpinnerService.start("DELETING");

          this.service.deleteMatchType(element.matchTypeId).subscribe(
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
    let dialogRef = this.dialog.open(AddMatchtypeDialogComponent, {
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
    let dialogRef = this.dialog.open(EditMatchtypeDialogComponent, {
      minWidth: '35vw',
      disableClose: true,
      data: {
        id: element.matchTypeId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.ngOnInit();
      }
    });
  }

}
