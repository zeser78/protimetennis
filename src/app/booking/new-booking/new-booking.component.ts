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
import { ClientService } from "src/app/services/client.service";
import { Client } from "src/app/models/client";

@Component({
  selector: "app-new-booking",
  templateUrl: "./new-booking.component.html",
  styleUrls: ["./new-booking.component.css"]
})
export class NewBookingComponent implements OnInit {
  booking: Observable<Booking[]>;
  client: Observable<Client[]>;
  user$: Observable<User>;
  newBooking: Booking;
  newClient: Client;

  constructor(
    private bookingService: BookingService,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private clientService: ClientService
  ) {
    this.user$ = this.authService.user$;
    console.log("from new =>" + this.user$);
  }

  ngOnInit() {
    this.booking = this.afs.collection("bookings").valueChanges();
    this.client = this.afs.collection("clients").valueChanges();
  }

  // Submit the booking

  onAddBooking(form: NgForm, newBooking: Booking, newClient: Client) {
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
      newClient = {
        uid: uid,
        name: value.name,
        lastName: value.lastName,
        email: value.email
      };
      this.bookingService.addBooking(newBooking);
      this.clientService.addClient(newClient);
      console.log(newClient);
      console.log("form =>" + form);
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
