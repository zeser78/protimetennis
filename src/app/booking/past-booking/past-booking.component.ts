import { Component, OnInit, OnDestroy } from "@angular/core";
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
  displayedColumns = ["id", "name", "lastName", "actions"];
  dataSource = new MatTableDataSource<any>();

  private booksSubscription: Subscription;
  bookings: Booking[];
  userId: string;
  user$: Observable<User>;
  booking: Booking;
  // userId: string = "0bAzS2sw46gqSTNmWRr7kYIsMIX2";
  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      this.userId = user.uid;
      console.log("again => " + this.userId);
      this.booksSubscription = this.bookingService
        .fetchItems(this.userId)
        .subscribe(bookings => {
          this.dataSource.data = bookings;
        });
    });
    console.log("trying" + this.userId);
  }

  onDeleteBooking(booking: Booking) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.bookingService.deleteBooking(booking);
        console.log("id in past => " + booking + result);
      }
    });
    // if (confirm("Are you sure? ")) {
    //   this.bookingService.deleteBooking(booking);
    //   console.log("id in past => " + booking);
    // }
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
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
