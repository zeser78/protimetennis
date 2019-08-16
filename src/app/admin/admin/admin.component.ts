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
  totalOverdue: number;
  totalPaid: number;
  // bookingsCollection: AngularFirestoreCollection<Booking>;
  bookings: Booking[];
  bookingDoc: AngularFirestoreDocument<Booking>;
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    public auth: AuthService,
    private bookingService: BookingService
  ) {
    this.user$ = this.auth.user$;
    console.log("admin user => " + this.user$);
  }

  ngOnInit() {
    // get user to do total balance
    this.user$.subscribe(user => {
      this.userId = user.uid;
      this.bookingService.fetchItems(this.userId).subscribe(bookings => {
        this.bookings = bookings;
        this.getTotal();
        this.getOverdue();
        this.totalPaid = this.totalAmount - this.totalOverdue;
      });
    });
  }
  getTotal() {
    this.totalAmount = this.bookings.reduce((total, booking) => {
      return total + booking.amount;
    }, 0);
  }

  getOverdue() {
    this.totalOverdue = this.bookings
      .filter(({ status }) => status == false)
      .reduce((total, booking) => {
        return total + booking.amount;
      }, 0);
  }
}
