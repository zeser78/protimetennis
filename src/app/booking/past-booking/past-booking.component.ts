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
  BreakpointObserver,
  BreakpointState,
  Breakpoints
} from "@angular/cdk/layout";
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
  changeTable: boolean;
  mobileTable: Observable<BreakpointState>;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private dialog: MatDialog,
    public breakpointObserver: BreakpointObserver
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
    this.mobileTable = this.breakpointObserver.observe(Breakpoints.XSmall);
    console.log(this.mobileTable);
    // this.breakpointObserver
    //   .observe(["(max-width: 600px"])
    //   .subscribe((state: BreakpointState) => {
    //     if (state.matches) {
    //       this.changeTable = state.matches;
    //       console.log(this.changeTable);
    //     } else {
    //       this.changeTable = state.matches;
    //       console.log(state.matches);
    //     }
    //   });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // this.breakpointObserver
    //   .observe(["(max-width: 600px"])
    //   .subscribe((state: BreakpointState) => {
    //     if (state.matches) {
    //       this.changeTable = state.matches;
    //       console.log(this.changeTable);
    //     } else {
    //       this.changeTable = state.matches;
    //       console.log(state.matches);
    //     }
    //   });
  }

  doFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

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
