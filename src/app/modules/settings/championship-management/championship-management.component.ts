import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddChampionshipDialogComponent } from './add-championship-dialog/add-championship-dialog.component';
import { EditChampionshipDialogComponent } from './edit-championship-dialog/edit-championship-dialog.component';
import { ChampionshipManagementService } from '../../../shared/services/championship-management.service';
import { ResponseDialogService } from '../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { ChampionshipManagement } from '../../../models/championship-management';

@Component({
  selector: 'app-championship-management',
  templateUrl: './championship-management.component.html',
  styleUrls: ['./championship-management.component.scss']
})
export class ChampionshipManagementComponent implements OnInit, AfterViewInit {
  //** Material Table Configuration */
  displayedColumns: string[] = ['championshipName','championshipTypeName','showName','superstarName','championshipOrder','action'];
  dataSource: MatTableDataSource<ChampionshipManagement>;

  championshipManagement!: ChampionshipManagement[];
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
    private router: Router,
    public dialog: MatDialog, 
    private service: ChampionshipManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { 
    this.dataSource = new MatTableDataSource(this.championshipManagement);
  }

  ngOnInit(): void {
    this.isNoRecord = true;
    this.getChampionshipManagementList();
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
    const dataList = [...this.championshipManagement]; // clone array

    if (checked == true) {
      var filteredData = dataList;
    }
    else {
      var filteredData = dataList.filter((data: any) => data.isActive.toString() === "true");
    }

    this.dataSource.data = filteredData;
  }

  isActiveFilter(){   
    this.dataSource.filter = "true";
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    };
  }

  getChampionshipManagementList() {
    this.ngxSpinnerService.start("LOADING");

    this.service.getChampionshipList().subscribe(
      (result: any) => {
        this.championshipManagement = result;
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
    let dialog = this.responseDialogService.start("DELETE","Are you sure to delete this Championship '"+element.championshipName+"'?");

    dialog.afterClosed().subscribe(dialogresult => {
      if (dialogresult != undefined) {
        if (dialogresult == "OK") {
          this.ngxSpinnerService.start("DELETING");

          this.service.deleteChampionship(element.championshipId).subscribe(
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
    let dialogRef = this.dialog.open(AddChampionshipDialogComponent, {
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
    let dialogRef = this.dialog.open(EditChampionshipDialogComponent, {
      minWidth: '35vw',
      disableClose: true,
      data: {
        id: element.championshipId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.ngOnInit();
      }
    });
  }

  openChampionshipType() {
    this.router.navigate(['settings/championshiptypemanagement']);
  }

  openChampionshipHistory() {
    this.router.navigate(['teamhistory']);
  }
}
