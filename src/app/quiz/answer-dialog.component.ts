import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'answer-dialog',
  templateUrl: './answer-dialog.component.html',
  styleUrls: ['./answer-dialog.component.css']
})
export class AnswerDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AnswerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit() {
    console.log(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}


