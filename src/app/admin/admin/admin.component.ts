import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { switchMap } from "rxjs/operators";
import { Observable, of, Subscription } from "rxjs";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { BookingService } from "src/app/services/booking.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  user$: Observable<User>;
  userId: string;
  updatedBooking: string;
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private auth: AuthService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    // this.updatedBooking.selectIndex = 1;
  }
}

// To edit
// ID from Booking collection
// Get id from url => this.id = this.route.snapshot.params['id'];
// and then Get Booking
