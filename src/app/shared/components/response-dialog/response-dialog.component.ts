import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-response-dialog',
  templateUrl: './response-dialog.component.html',
  styleUrls: ['./response-dialog.component.scss']
})
export class ResponseDialogComponent implements OnInit {
  responsetype: string = "";
  responsemessage: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public matdata: any,
    public dialogref: MatDialogRef<ResponseDialogComponent>
  ) { }

  ngOnInit(): void {
    this.responsetype = this.matdata.responsetype;
    this.responsemessage = this.matdata.responsemessage;
  }

  onSubmit() {
    this.dialogref.close('OK');
  }
}
