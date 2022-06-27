import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddPpvDialogComponent } from './add-ppv-dialog/add-ppv-dialog.component';
import { EditPpvDialogComponent } from './edit-ppv-dialog/edit-ppv-dialog.component';
import { PPVManagementService } from '../../../shared/services/ppv-management.service';
import { ResponseDialogService } from '../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../shared/components/ngx-spinner/ngx-spinner.service';
import { PPVManagement } from '../../../models/ppv-management';

@Component({
  selector: 'app-ppv-management',
  templateUrl: './ppv-management.component.html',
  styleUrls: ['./ppv-management.component.scss']
})
export class PpvManagementComponent implements OnInit, AfterViewInit  {
  //** Material Table Configuration */
  displayedColumns: string[] = ['ppvName','ppvMonth','showName','ppvOrder','action'];
  dataSource: MatTableDataSource<PPVManagement>;

  ppvManagement: PPVManagement[] = [];
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
    private service: PPVManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService
  ) { 
    this.dataSource = new MatTableDataSource(this.ppvManagement);
  }

  ngOnInit(): void {
    this.isNoRecord = true;
    this.getPPVManagementList();
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
    const dataList = [...this.ppvManagement]; // clone array

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

  getPPVManagementList() {
    this.ngxSpinnerService.start("LOADING");

    this.service.getPPVList().subscribe(
      (result: any) => {
        this.ppvManagement = result;
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
    let dialog = this.responseDialogService.start("DELETE","Are you sure to delete this PPV '"+element.ppvName+"'?");

    dialog.afterClosed().subscribe(dialogresult => {
      if (dialogresult != undefined) {
        if (dialogresult == "OK") {
          this.ngxSpinnerService.start("DELETING");

          this.service.deletePPV(element.ppvId).subscribe(
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
    let dialogRef = this.dialog.open(AddPpvDialogComponent, {
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
    let dialogRef = this.dialog.open(EditPpvDialogComponent, {
      minWidth: '35vw',
      disableClose: true,
      data: {
        id: element.ppvId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.ngOnInit();
      }
    });
  }

}
