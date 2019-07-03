import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Router } from "@angular/router";
import { Booking } from "../models/booking";

@Injectable({
  providedIn: "root"
})
export class BookingService {
  bookingsCollection: AngularFirestoreCollection<Booking>;
  bookings: Observable<Booking[]>;
  BookingDoc: AngularFirestoreDocument<Booking>;

  constructor(private router: Router, private afs: AngularFirestore) {
    this.bookingsCollection = this.afs.collection("bookings");
  }

  getBooking() {
    return this.bookingsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Booking;
          return data;
        });
      })
    );
  }

  adddBooking(booking: Booking) {
    this.bookingsCollection.add(booking);
  }
}
