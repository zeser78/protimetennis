import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { firestore } from "firebase/app";
import Timestamp = firestore.Timestamp;
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

import { Router } from "@angular/router";
import { Booking } from "../models/booking";
import { AuthService } from "./auth.service";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class BookingService {
  bookingsCollection: AngularFirestoreCollection<Booking>;
  // bookings: Observable<Booking[]>;
  bookings: Booking[];
  BookingDoc: AngularFirestoreDocument<Booking>;
  userId: string;
  user$: Observable<User>;
  booking: Observable<Booking>;

  // userId: string = "0bAzS2sw46gqSTNmWRr7kYIsMIX2";

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private authService: AuthService
  ) {
    // this.bookingsCollection = this.afs.collection("bookings", ref =>
    //   ref.where("uid", "==", this.userId)
    // );
    // this.authService.user$.subscribe(user => {
    //   this.userId = user.uid;
    //   console.log("working 1 =>" + this.userId + typeof this.userId);
    // this.fetchItems(this.userId);
    // this.bookingsCollection = this.afs.collection("bookings", ref =>
    //   ref.where("uid", "==", this.userId)
    // );
    // });
  }

  fetchItems(userId: string) {
    this.bookingsCollection = this.afs.collection("bookings", ref =>
      ref.where("uid", "==", userId)
    );
    return this.bookingsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Booking;
          data.id = a.payload.doc.id;
          // const date = Timestamp.fromDate(data.date);
          // const date = firestore.FieldValue.serverTimestamp();
          // data.date = a.payload.doc.data().date.;
          // console.log(data.id);
          // const timeStamp: any = data.date;
          console.log("testing " + data.date);
          // console.log(Timestamp(new Date(data.date)).toDate());
          // data.date = (timeStamp as Timestamp).toDate();

          return data;
        });
      })
    );
    // const timeStamp: any = bookings.date;
    // bookings.date = (timeStamp as Timestamp.toDate();
    // return bookings);
    // .subscribe(item => {
    //   this.bookings = item;
    //   console.log("working?" + item);
    // });
  }
  // fetchItems(userId: string) {
  //   return this.afs
  //     .collection("bookings", ref => ref.where("uid", "==", userId))
  //     .valueChanges()
  //     .subscribe(item => {
  //       this.bookings = item;
  //       console.log("working?" + item);
  //     });
  // }
  // getBooking() {
  //   return this.bookingsCollection.snapshotChanges().pipe(
  //     map(changes => {
  //       return changes.map(a => {
  //         const data = a.payload.doc.data() as Booking;
  //         return data;
  //       });
  //     })
  //   );
  // }

  // getBooking(id: string): Observable<Booking> {
  //   this.BookingDoc = this.afs.doc<Booking>(`booking/${id}`);
  //   this.booking = this.BookingDoc.snapshotChanges().pipe(
  //     map(action => {
  //       if (action.payload.exists === false) {
  //         return null;
  //       } else {
  //         const data = action.payload.data() as Booking;
  //         data.id = action.payload.id;

  //         return data;
  //       }
  //     })
  //   );

  //   return this.booking;
  //   //  console.log("booking2 id => " + this.booking);
  // }

  addBooking(booking: Booking) {
    this.bookingsCollection.add(booking);
  }

  updateBooking(booking: Booking) {
    this.BookingDoc = this.afs.doc(`bookings/${booking.id}`);
    this.BookingDoc.update(booking);
    console.log("booking id => " + booking);
  }
  deleteBooking(booking: Booking) {
    this.BookingDoc = this.afs.doc(`bookings/${booking.id}`);
    this.BookingDoc.delete();
    console.log("booking id delete=> " + booking.id);
  }
}
