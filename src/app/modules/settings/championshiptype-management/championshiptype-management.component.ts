import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddChampionshiptypeDialogComponent } from './add-championshiptype-dialog/add-championshiptype-dialog.component';
import { EditChampionshiptypeDialogComponent } from './edit-championshiptype-dialog/edit-championshiptype-dialog.component';
import { ChampionshipManagementService } from '../../../shared/services/championship-management.service';
import { ResponseDialogService } from '../../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../../shared/components/ngx-spinner/ngx-spinner.service';
import { ChampionshipTypeManagement } from '../../../models/championship-management';

@Component({
  selector: 'app-championshiptype-management',
  templateUrl: './championshiptype-management.component.html',
  styleUrls: ['./championshiptype-management.component.scss']
})
export class ChampionshiptypeManagementComponent implements OnInit {
    //** Material Table Configuration */
    displayedColumns: string[] = ['championshipTypeName','championshipTypeOrder','action'];
    dataSource: MatTableDataSource<ChampionshipTypeManagement>;

    championshipTypeManagement!: ChampionshipTypeManagement[];
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
    private location: Location,
    public dialog: MatDialog, 
    private service: ChampionshipManagementService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService
  ) { 
    this.dataSource = new MatTableDataSource(this.championshipTypeManagement);
  }

  ngOnInit(): void {
    this.isNoRecord = true;
    this.getChampionshipTypeManagementList();
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
    const dataList = [...this.championshipTypeManagement]; // clone array

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

  getChampionshipTypeManagementList() {
    this.ngxSpinnerService.start("LOADING");

    this.service.getChampionshipTypeList().subscribe(
      (result: any) => {
        this.championshipTypeManagement = result;
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
    let dialog = this.responseDialogService.start("DELETE","Are you sure to delete this Championship Type '"+element.championshipTypeName+"'?");

    dialog.afterClosed().subscribe(dialogresult => {
      if (dialogresult != undefined) {
        if (dialogresult == "OK") {
          this.ngxSpinnerService.start("DELETING");

          this.service.deleteChampionshipType(element.championshipTypeId).subscribe(
            (result: any) => {
              this.ngxSpinnerService.stop();
              this.responseDialogService.start("SUCCESS", result);
              this.ngOnInit();
            }, error => {
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
    let dialogRef = this.dialog.open(AddChampionshiptypeDialogComponent, {
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
    let dialogRef = this.dialog.open(EditChampionshiptypeDialogComponent, {
      minWidth: '35vw',
      disableClose: true,
      data: {
        id: element.championshipTypeId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.ngOnInit();
      }
    });
  }

  onBack() {
    this.location.back();
  }

}
