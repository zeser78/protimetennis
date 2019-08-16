import { NgModule } from "@angular/core";
import { CdkTableModule } from "@angular/cdk/table";
import { LayoutModule } from "@angular/cdk/layout";
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatTableModule,
  MatSnackBarModule,
  MatDialogModule,
  MatButtonToggleModule,
  MatSortModule,
  MatSlideToggleModule,
  MatGridListModule
} from "@angular/material";

/**
 * NgModule that includes all Material modules.
 */
@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    CdkTableModule,
    LayoutModule,
    MatGridListModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    CdkTableModule,
    LayoutModule,
    MatGridListModule
  ]
})
export class MaterialModule {}
