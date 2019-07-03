import { Component, OnInit, OnDestroy } from "@angular/core";
import { Booking } from "src/app/models/booking";
import { MatTableDataSource } from "@angular/material";
import { Subscription } from "rxjs";

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
  constructor() {}

  ngOnInit() {
    // this.booksSubscription =
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
