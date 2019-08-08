import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-status-training",
  template: `
    <h1 mat-dialog-title>Are you want to change the status?</h1>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>
  `
})
export class DialogStatusComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
// <mat-dialog-content>
// <p>You already got {{ passedData.progress }}%</p>
// </mat-dialog-content>
// <mat-dialog-actions>
