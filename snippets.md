import { Component, OnInit, OnDestroy, ElementRef } from "@angular/core";
import { BookingService } from "../../services/booking.service";
import { NgForm } from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import { Client } from "../../models/client";
import { AngularFirestore } from "@angular/fire/firestore";
import { Booking } from "src/app/models/booking";

@Component({
selector: "app-new-lesson",
templateUrl: "./new-lesson.component.html",
styleUrls: ["./new-lesson.component.css"]
})
export class NewLessonComponent implements OnInit {
items: Observable<any[]>;
// newBooking: Client[];
private booksSubscription: Subscription;
constructor(
private bookingService: BookingService,
private db: AngularFirestore // private db: AngularFirestore
) {}

ngOnInit() {
// this.items = this.db.collection("users").valueChanges();
}

// or Submit Client to history
onAddBooking(form: NgForm, newBooking: Booking) {
const value = form.value;
newBooking = { name: value.name, lastName: value.lastName };
// this.bookingService.addBookingToDatabase(newBooking);

    console.log(form);
    // this.db.collection("lessons").add(newBooking);
    this.bookingService.addBooking(newBooking);
    // console.log(newBooking);
    form.reset();

}

// onSubmit(form: NgForm) {
// console.log(form);
// }
}

// onAddElement(form: NgForm) {
// const value = form.value;
// const newElement = new Element(value.elementName, value.elementColor);
// this.elementsService.addElement(newElement);

// .subscribe((bookings: Client[]) => {
// this.dataSource.data = bookings;
// // this.dataSource.data = this.bookingService.getBooking();
// console.log("now");
// });
// this.bookingService.fetchBooking();
// console.log(this.booksSubscription);

/////HTML

<section class="new-training" fxLayout fxLayoutAlign="center">
  <form (ngSubmit)="onAddBooking(f)" #f="ngForm">
    <mat-card fxFlex.xs="100%" fxFlex="400px">
      <mat-card-title fxLayoutAlign="center">Add your class!</mat-card-title>
      <mat-card-content fxLayout="column" fxLayoutAlign="center">
        <mat-form-field>
          <input type="text" matInput placeholder="Name" ngModel name="name" />
        </mat-form-field>
        <mat-form-field>
          <input
            type="text"
            matInput
            placeholder="Last Name"
            ngModel
            name="lastName"
          />
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions fxLayoutAlign="center">
        <button type="submit" mat-raised-button color="primary">
          Save
        </button>
      </mat-card-actions>
    </mat-card>
  </form>
</section>

///

<div fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutAlign.xs="center stretch" class="row-example">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
