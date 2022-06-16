import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResponseDialogComponent } from './response-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ResponseDialogService {
  // RESPONSE LIBRARY
  //   - INFORMATION
  //   - WARNING
  //   - ERROR
  //   - SUCCESS
  //   - QUESTION
  //   - DELETE

  // SAMPLE CODE
  //  this.dialogresponse.start("WARNING","No data gathered, Please try again...");
  //  this.dialogresponse.start("ERROR","Server not found");
  //  this.dialogresponse.start("SUCCESS","Data successfully saved");
  //  this.dialogresponse.start("QUESTION","Do you want to delete this?");

  constructor(private dialog: MatDialog) { }

  start(responsetype: string, responsemessage: string): MatDialogRef<ResponseDialogComponent> {  
        
    const dialogRef = this.dialog.open(ResponseDialogComponent,{ 
      minWidth: '20vw',
      height: '20vh',
      data: {
        responsetype: responsetype,
        responsemessage: responsemessage
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      return result;
    }); 
      return dialogRef;
    };  

  stop(ref: MatDialogRef<ResponseDialogComponent>) {  
    ref.close();  
  } 
}
