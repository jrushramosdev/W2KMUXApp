import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddShowDialogComponent } from './add-show-dialog/add-show-dialog.component';
import { EditShowDialogComponent } from './edit-show-dialog/edit-show-dialog.component';
import { ShowManagementService } from '../../../shared/services/show-management.service';
import { ResponseDialogService } from '../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ShowManagement } from '../../../models/show-management';

@Component({
  selector: 'app-show-management',
  templateUrl: './show-management.component.html',
  styleUrls: ['./show-management.component.scss']
})
export class ShowManagementComponent implements OnInit, AfterViewInit {
  //** Material Table Configuration */
  displayedColumns: string[] = ['showName','showOrder','action'];
  dataSource: MatTableDataSource<ShowManagement>;

  showManagement!: ShowManagement[];
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
    private service: ShowManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService
  ) { 
    this.dataSource = new MatTableDataSource(this.showManagement);
  }

  ngOnInit(): void {
    this.isNoRecord = true;
    this.getShowManagementList();
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
    const dataList = [...this.showManagement]; // clone array

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

  getShowManagementList() {
    this.ngxSpinnerService.start("LOADING");

    this.service.getShowList().subscribe(
      (result: any) => {
        this.showManagement = result;
        this.onToggleFilter(this.checked); 
        this.isNoRecord = false;
        this.ngxSpinnerService.stop();
      }, error => {
        this.ngxSpinnerService.stop();
        if (error.status == 0) {this.snackbarService.openSnackBar("Network Error, The network connection is lost", "close");}
        else {
          if (error.error.ErrorMessage == undefined || error.error.ErrorMessage == "") {this.snackbarService.openSnackBar(error.error, "close");}
          else {this.snackbarService.openSnackBar(error.error.ErrorMessage, "close");}}
        this.isNoRecord = true;
      }
    );
  }

  onDelete(element: any) {
    let dialog = this.responseDialogService.start("DELETE","Are you sure to delete this Show '"+element.showName+"'?");

    dialog.afterClosed().subscribe(dialogresult => {
      if (dialogresult != undefined) {
        if (dialogresult == "OK") {
          this.ngxSpinnerService.start("DELETING");

          this.service.deleteShow(element.showId).subscribe(
            (result: any) => {
              this.ngxSpinnerService.stop();
              this.responseDialogService.start("SUCCESS", result);
              this.ngOnInit();
            }, error => {
              this.ngxSpinnerService.stop();
              if (error.status == 0) {this.snackbarService.openSnackBar("Network Error, The network connection is lost", "close");}
              else {
                if (error.error.ErrorMessage == undefined || error.error.ErrorMessage == "") {this.snackbarService.openSnackBar(error.error, "close");}
                else {this.snackbarService.openSnackBar(error.error.ErrorMessage, "close");}}
            }
          );
        }
      }
    });
  }

  openAddDialog() {
    let dialogRef = this.dialog.open(AddShowDialogComponent, {
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
    let dialogRef = this.dialog.open(EditShowDialogComponent, {
      minWidth: '35vw',
      disableClose: true,
      data: {
        id: element.showId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.ngOnInit();
      }
    });
  }
}
