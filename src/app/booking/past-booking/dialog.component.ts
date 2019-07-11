import { Component, Inject } from "@angular/core";
// import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: "app-dialog",
  template: `
    <h1 mat-dialog-title>Are you sure?</h1>

    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>
  `
})
export class DialogComponent {
  //   constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}

// <mat-dialog-content>
//   <p>You already got {{ passedData.progress }}%</p>
// </mat-dialog-content>
