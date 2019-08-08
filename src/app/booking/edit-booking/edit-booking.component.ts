import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Booking } from "src/app/models/booking";
import { BookingService } from "src/app/services/booking.service";
import { Router, ActivatedRoute, ParamMap, Params } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

@Component({
  selector: "app-edit-booking",
  templateUrl: "./edit-booking.component.html",
  styleUrls: ["./edit-booking.component.css"]
})
export class EditBookingComponent implements OnInit {
  id: string;
  bookings: Booking[];

  bookingDoc: AngularFirestoreDocument<Booking>;
  booking$: Observable<Booking>;
  booking: Booking = {
    name: "",
    lastName: "",
    date: "",
    time: "",
    hours: "",
    amount: 0
  };
  constructor(
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    // this.route.snapshot.params["id"];
    // console.log(this.id);

    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      console.log(this.id);
    });
    console.log("outside id =>" + this.id);

    // Get Booking when initialize- working
    this.getBooking(this.id).subscribe(booking => {
      this.booking = booking;
      console.log("name =>" + this.booking.name);
    });
  }

  getParams() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      console.log(this.id);
    });
    console.log("outside id =>" + this.id);

    // Get Booking when initialize- working
    this.getBooking(this.id).subscribe(booking => {
      this.booking = booking;
      console.log("name =>" + this.booking.name);
    });
  }

  getBooking(id: string) {
    this.bookingDoc = this.afs.doc<Booking>(`bookings/${id}`);
    this.booking$ = this.bookingDoc.snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Booking;
        data.id = a.payload.id;
        data.date = a.payload.data().date.toDate();
        return data;
      })
    );
    return this.booking$;
  }

  onUpdateBooking(form: NgForm, updateBooking: Booking) {
    const value = form.value;
    const id = this.id;
    updateBooking = {
      name: value.name,
      lastName: value.lastName,
      date: value.date,
      time: value.time,
      hours: value.hours,
      amount: value.amount
    };
    console.log("ahora => " + id);
    this.bookingService.updateBooking(id, updateBooking);
    this.router.navigate(["/admin/activities"]);
    // this.bookingDoc = this.afs.doc<Booking>(`bookings/${this.id}`);
    // this.bookingDoc.update(updateBooking);
    // // this.updateBooking();
    // console.log("name =>" + form.value.name);
    // console.log("form =>" + form);
    // form.reset();
  }
}
