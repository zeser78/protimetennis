import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
// import { firestore } from "firebase/app";
// import Timestamp = firestore.Timestamp;
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Router, ActivatedRoute, Params } from "@angular/router";
import { Booking } from "../models/booking";
import { AuthService } from "./auth.service";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class BookingService {
  id: string;
  bookingsCollection: AngularFirestoreCollection<Booking>;

  bookings: Booking[];
  bookingDoc: AngularFirestoreDocument<Booking>;
  userId: string;
  user$: Observable<User>;
  booking$: Observable<Booking>;
  // booking$: Observable<Booking>;
  booking: Booking = {
    status: ""
  };

  // userId: string = "0bAzS2sw46gqSTNmWRr7kYIsMIX2";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}

  fetchItems(userId: string): Observable<Booking[]> {
    this.bookingsCollection = this.afs.collection("bookings", ref =>
      ref.where("uid", "==", userId)
    );
    return this.bookingsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Booking;
          data.id = a.payload.doc.id;

          console.log("testing " + data.date);

          return data;
        });
      })
    );
  }

  addBooking(booking: Booking) {
    this.bookingsCollection.add(booking);
    this.router.navigate(["/admin/activities"]);
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

  updateBooking(id: string, booking: Booking) {
    this.bookingDoc = this.afs.doc<Booking>(`bookings/${id}`);
    this.bookingDoc.update(booking);
    console.log("booking id => " + booking);
  }

  deleteBooking(booking: Booking) {
    this.bookingDoc = this.afs.doc(`bookings/${booking.id}`);
    this.bookingDoc.delete();
    console.log("booking id delete=> " + booking.id);
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
}
