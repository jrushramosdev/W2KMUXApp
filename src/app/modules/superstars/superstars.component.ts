import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddSuperstarsDialogComponent } from './add-superstars-dialog/add-superstars-dialog.component';
import { EditSuperstarsDialogComponent } from './edit-superstars-dialog/edit-superstars-dialog.component';
import { SuperstarsService } from '../../shared/services/superstars.service';
import { ResponseDialogService } from '../../shared/components/response-dialog/response-dialog.service';
import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';
import { NgxSpinnerService } from '../../shared/components/ngx-spinner/ngx-spinner.service';
import { ErrorHandlerService } from 'src/app/shared/components/error-handling/error-handler.service';
import { Superstars, UpdateSuperstars } from '../../models/superstars';

@Component({
  selector: 'app-superstars',
  templateUrl: './superstars.component.html',
  styleUrls: ['./superstars.component.scss']
})
export class SuperstarsComponent implements OnInit, AfterViewInit {
  //** Material Table Configuration */
  displayedColumns: string[] = ['superstarName','gender','role','teamName','showName','championshipName','isInjured','isActive','action'];
  dataSource: MatTableDataSource<Superstars>;

  superstar!: Superstars[];
  updateSuperstars!: UpdateSuperstars;
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
    private service: SuperstarsService,
    private responseDialogService: ResponseDialogService,
    private snackbarService: SnackbarService,
    private ngxSpinnerService: NgxSpinnerService,
    private errorHandlerService: ErrorHandlerService
  ) { 
    this.dataSource = new MatTableDataSource(this.superstar);
  }

  ngOnInit(): void {
    this.isNoRecord = true;
    this.getSuperstarList();
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
    const dataList = [...this.superstar]; // clone array

    if (checked == true) {
      var filteredData = dataList;
    }
    else {
      var filteredData = dataList.filter((data: any) => data.isActive.toString() === "true");
    }

    this.dataSource.data = filteredData;
  }

  getSuperstarList() {
    this.ngxSpinnerService.start("LOADING");

    this.service.getSuperstarList().subscribe(
      (result: any) => {
        this.superstar = result;
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
    let dialog = this.responseDialogService.start("DELETE","Are you sure to delete this Superstar '"+element.superstarName+"'?");

    dialog.afterClosed().subscribe(dialogresult => {
      if (dialogresult != undefined) {
        if (dialogresult == "OK") {
          this.ngxSpinnerService.start("DELETING");

          this.service.deleteSuperstar(element.superstarId).subscribe(
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
    let dialogRef = this.dialog.open(AddSuperstarsDialogComponent, {
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
    let dialogRef = this.dialog.open(EditSuperstarsDialogComponent, {
      minWidth: '35vw',
      disableClose: true,
      data: {
        id: element.superstarId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.ngOnInit();
      }
    });
  }

  onUpdateInjury(element: any) {
    this.ngxSpinnerService.start("SAVING");
  
    this.updateSuperstarData(element);
    this.service.updateSuperstar(this.updateSuperstarData(element)).subscribe(
      (result: any) => {
        this.ngxSpinnerService.stop();
        this.ngOnInit();
      }, error => {
        this.ngxSpinnerService.stop();
        this.snackbarService.openSnackBar(this.errorHandlerService.errorHandling(error), "close");
      }
    );
  }

  updateSuperstarData(element: any): UpdateSuperstars {
    return this.updateSuperstars = {
      superstarId: element.superstarId,
      superstarName: element.superstarName,
      gender: element.gender,
      role: element.role,
      teamId: element.teamId,
      showId: element.showId,
      isInjured: !element.isInjured,
      isActive: element.isActive
    };
  }

  openAchievements() {
    console.log("teste")
  }
}
