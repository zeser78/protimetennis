import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { firestore } from "firebase/app";
import Timestamp = firestore.Timestamp;
import { MatTableDataSource, MatSort } from "@angular/material";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Booking } from "src/app/models/booking";
import { Subscription, Observable } from "rxjs";
import { BookingService } from "src/app/services/booking.service";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user";
import { DialogComponent } from "./dialog.component";

@Component({
  selector: "app-past-booking",
  templateUrl: "./past-booking.component.html",
  styleUrls: ["./past-booking.component.css"]
})
export class PastBookingComponent implements OnInit, OnDestroy {
  displayedColumns = [
    "name",
    "lastName",
    "date",
    "time",
    "hour",
    "amount",
    "actions"
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  private booksSubscription: Subscription;
  private userSubscription: Subscription;
  bookings: Booking[];
  userId: string;
  user$: Observable<User>;
  booking: Booking;
  editState: boolean = false;
  bookingToEdit: Booking;
  updateForm: FormGroup;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    this.userSubscription = this.user$.subscribe(user => {
      this.userId = user.uid;
      console.log("again => " + this.userId);
      this.booksSubscription = this.bookingService
        .fetchItems(this.userId)
        .subscribe(bookings => {
          this.dataSource.data = bookings;
          // this.testBooking = bookings;
          // console.log(this.testBooking);
        });
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  doFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onEditBooking(event, booking: Booking) {
    if (!this.editState) {
      this.editState = true;
      this.bookingToEdit = booking;
      console.log("store data => " + booking);
    } else {
      this.editState = false;
      this.bookingToEdit = null;
    }
  }
  getControl(booking, field) {
    console.log("test form" + booking.id + "field" + field);
  }
  // onUpdateBooking(booking: Booking) {
  //   this.updateForm = new FormGroup({
  //     firstName: new FormControl(null)
  //   });
  //   console.log("formgroup" + this.updateForm);
  //   // this.bookingService.updateBooking(this.updateForm);
  // }

  onUpdateBooking(updateBooking: Booking) {
    console.log(this.booking.name);
    // updateBooking = {
    //   name: this.booking.name
    //   // lastName: value.lastName,
    //   // date: value.date,
    //   // amount: value.amount
    // };
    // console.log(updateBooking);
    // this.bookingService.updateBooking(updateBooking);
  }

  onDeleteBooking(booking: Booking) {
    if (!this.editState) {
      const dialogRef = this.dialog.open(DialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.bookingService.deleteBooking(booking);
          console.log("id in past => " + booking + result);
        }
      });
    } else {
      //  this.onsubmit(NgForm, updateBooking);
    }
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
