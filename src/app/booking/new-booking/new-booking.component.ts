import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BookingService } from "src/app/services/booking.service";
import { firestore } from "firebase/app";
import Timestamp = firestore.Timestamp;
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { NgForm } from "@angular/forms";
import { Booking } from "src/app/models/booking";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-new-booking",
  templateUrl: "./new-booking.component.html",
  styleUrls: ["./new-booking.component.css"]
})
export class NewBookingComponent implements OnInit {
  booking: Observable<Booking[]>;
  user$: Observable<User>;
  newBooking: Booking;

  constructor(
    private bookingService: BookingService,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.user$ = this.authService.user$;
    console.log("from new =>" + this.user$);
  }

  ngOnInit() {
    this.booking = this.afs.collection("booking").valueChanges();
    // let snackBarRef = this._snackBar.open("Message archived");
  }

  // Submit the booking

  onAddBooking(form: NgForm, newBooking: Booking) {
    this.user$ = this.authService.user$;
    this.authService.user$.subscribe(user => {
      const uid = user.uid;
      console.log("uid =>" + uid);
      const value = form.value;
      newBooking = {
        uid: uid,
        name: value.name,
        lastName: value.lastName,
        date: value.date,
        time: value.time,
        hours: value.hours,
        amount: value.amount
      };
      this.bookingService.addBooking(newBooking);
      console.log("date =>" + form.value.date);
      console.log("time =>" + form.value.time);
      console.log("date TimeStamp =>" + newBooking.date);
      form.reset();
    });

    // const value = form.value;
    // newBooking = { name: value.name, lastName: value.lastName };
    // console.log(form);
    // this.bookingService.adddBooking(newBooking);
    // form.reset();
    // date: firestore.Timestamp.fromDate(
    //   new Date("December 10, 1815")
    // ).toDate()
  }

  openSnackBar(message: string = "Done!") {
    this._snackBar.open(message, "", {
      duration: 2000
    });
    {
    }
  }
}
// 1) Add date and time !! maybe Number
