import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { firestore } from "firebase/app";
import Timestamp = firestore.Timestamp;
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Booking } from "src/app/models/booking";
import { MatTableDataSource } from "@angular/material";
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

  private booksSubscription: Subscription;
  private userSubscription: Subscription;
  bookings: Booking[];
  userId: string;
  user$: Observable<User>;
  booking: Booking;
  editState: boolean = false;
  bookingToEdit: Booking;
  updateForm: FormGroup;
  // testBooking: Array<any>;
  // today: number = Date.now();
  // timestamp = Timestamp.fromDate(new Date("July 11, 1978"));
  // timestamp = new Timestamp(-4861710238, 0).toDate();

  // userId: string = "0bAzS2sw46gqSTNmWRr7kYIsMIX2";
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

    // console.log("type " + typeof this.timestamp + this.timestamp);
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
  onSubmit(form: NgForm, updateBooking: Booking) {
    // this.user$ = this.authService.user$;
    // this.authService.user$.subscribe(user => {
    //   const uid = user.uid;
    //   console.log("uid =>" + uid);
    //   const value = form.value;
    //   updateBooking = {
    //     uid: uid,
    //     name: value.name
    //     // lastName: value.lastName,
    //     // date: value.date,
    //     // amount: value.amount
    //   };
    //   this.bookingService.updateBooking(updateBooking);
    //   console.log("date =>" + form.value.date);
    //   console.log("date TimeStamp =>" + updateBooking.date);
    //   form.reset();
    // });
    // if (confirm("Are you sure? ")) {
    //   this.bookingService.deleteBooking(booking);
    //   console.log("id in past => " + booking);
    // }
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}

// this.dataSource.data = this.bookingService.fetchItems(userId);
// this.booksSubscription = this.bookingService
//   .fetchItems(this.userId)
//   .subscribe(bookings => {
//     console.log(bookings);
//     console.log(this.userId);
//     this.dataSource.data = bookings;
//     console.log("NewBooking => " + bookings);
//   });

// this.dataSource.data = this.bookingService.fetchItems(userId);

/// Working
// this.booksSubscription = this.bookingService
//   .fetchItems(this.userId)
//   .subscribe(bookings => {
//     console.log(bookings);
//     console.log(this.userId);
//     this.dataSource.data = bookings;
//     console.log("NewBooking => " + bookings);
//   });

///
