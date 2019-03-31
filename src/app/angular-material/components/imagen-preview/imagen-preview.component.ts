
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'imagen-preview',
  templateUrl: './imagen-preview.component.html',
  styleUrls: ['./imagen-preview.component.css']
})
export class ImagenPreviewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImagenPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onOkClick(): void {
    this.dialogRef.close(false);
  }
  ngOnInit() {
  }

}
