import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { firestore } from "firebase/app";
import Timestamp = firestore.Timestamp;
import {
  MatTableDataSource,
  MatSort,
  MatSlideToggleChange
} from "@angular/material";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Booking } from "src/app/models/booking";
import { Subscription, Observable } from "rxjs";
import { BookingService } from "src/app/services/booking.service";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user";
import { DialogComponent } from "./dialog.component";
import { DialogStatusComponent } from "./dialog-status.compoments";

@Component({
  selector: "app-past-booking",
  templateUrl: "./past-booking.component.html",
  styleUrls: ["./past-booking.component.css"]
})
export class PastBookingComponent implements OnInit, OnDestroy {
  displayedColumns = [
    "name",
    "lastName",
    "date",
    "time",
    "hour",
    "amount",
    "actions",
    "status"
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  // @Input() checked: Boolean;
  @Output()
  change: EventEmitter<MatSlideToggleChange>;

  private booksSubscription: Subscription;
  private userSubscription: Subscription;
  bookings: Booking[];
  userId: string;
  user$: Observable<User>;
  booking: Booking;
  editState: boolean = false;
  bookingToEdit: Booking;
  updateForm: FormGroup;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    this.userSubscription = this.user$.subscribe(user => {
      this.userId = user.uid;
      console.log("again => " + this.userId);
      this.booksSubscription = this.bookingService
        .fetchItems(this.userId)
        .subscribe(bookings => {
          this.dataSource.data = bookings;
          // this.testBooking = bookings;
          // console.log(this.testBooking);
        });
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  doFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // onEditBooking(event, booking: Booking) {
  //   if (!this.editState) {
  //     this.editState = true;
  //     this.bookingToEdit = booking;
  //     console.log("store data => " + booking);
  //   } else {
  //     this.editState = false;
  //     this.bookingToEdit = null;
  //   }
  // }
  getControl(booking, field) {
    console.log("test form" + booking.id + "field" + field);
  }
  onUpdateStatus($event, booking: Booking) {
    console.log(booking.id);
    const id = booking.id;

    if ($event.checked == true) {
      // change to true = PAID
      const dialogStatus = this.dialog.open(DialogStatusComponent);
      dialogStatus.afterClosed().subscribe(result => {
        // YES
        if (result == true) {
          booking = {
            status: true
          };
          this.bookingService.getBooking(id);
          this.bookingService.updateBooking(id, booking);
        } else {
          // NO
          return (booking.status = false);
        }
      });
    } else {
      // change to false
      const dialogStatus = this.dialog.open(DialogStatusComponent);
      dialogStatus.afterClosed().subscribe(result => {
        if (result == true) {
          booking = {
            status: false
          };
          this.bookingService.getBooking(id);
          this.bookingService.updateBooking(id, booking);
        } else {
          return (booking.status = true);
        }
      });
    }
  }

  // onUpdateBooking(form: NgForm, updateBooking: Booking) {
  //   const value = form.value;
  //   const id = this.id;
  //   updateBooking = {
  //     name: value.name,
  //     lastName: value.lastName,
  //     date: value.date,
  //     time: value.time,
  //     hours: value.hours,
  //     amount: value.amount
  //   };
  //   console.log("ahora => " + id);
  //   this.bookingService.updateBooking(id, updateBooking);
  //   this.router.navigate(["/admin/activities"]);
  //   // this.bookingDoc = this.afs.doc<Booking>(`bookings/${this.id}`);
  //   // this.bookingDoc.update(updateBooking);
  //   // // this.updateBooking();
  //   // console.log("name =>" + form.value.name);
  //   // console.log("form =>" + form);
  //   // form.reset();
  // }

  onDeleteBooking(booking: Booking) {
    if (!this.editState) {
      const dialogRef = this.dialog.open(DialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.bookingService.deleteBooking(booking);
          console.log("id in past => " + booking + result);
        }
      });
    } else {
      //  this.onsubmit(NgForm, updateBooking);
    }
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
