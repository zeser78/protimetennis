import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { Subscription } from "rxjs";
// import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe(
    //   authStatus => {
    //     this.isAuth = authStatus;
    //   }
    // );
  }
  onClose() {
    // this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    // this.authService.logout();
  }

  ngOnDestroy() {
    // this.authSubscription.unsubscribe();
  }
}
