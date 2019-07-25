import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { switchMap, map } from "rxjs/operators";
import { Observable, of, Subscription } from "rxjs";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { BookingService } from "src/app/services/booking.service";
import { Booking } from "src/app/models/booking";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  user$: Observable<User>;
  userId: string;
  totalAmount: number;
  bookingsCollection: AngularFirestoreCollection<Booking>;
  bookings: Booking[];
  bookingDoc: AngularFirestoreDocument<Booking>;
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private auth: AuthService,
    private bookingService: BookingService
  ) {
    this.user$ = this.auth.user$;
    console.log("admin user => " + this.user$);
  }

  ngOnInit() {
    // this.auth.getUser();
    this.user$.subscribe(user => {
      this.userId = user.uid;
      this.bookingService.fetchItems(this.userId).subscribe(bookings => {
        this.bookings = bookings;
        this.getTotal();
      });
    });
  }
  getTotal() {
    this.totalAmount = this.bookings.reduce((total, booking) => {
      return total + booking.amount;
    }, 0);
  }
}

// To edit
// ID from Booking collection
// Get id from url => this.id = this.route.snapshot.params['id'];
// and then Get Booking
